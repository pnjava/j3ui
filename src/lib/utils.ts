import { FormFieldDefinition } from "@/components/custom-ui/FormField";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TableOfCost, Totals } from "./types/Plan";
import { AxiosResponse } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEnum<EV, ET extends { [key: string]: EV }>(
  enumValue: EV,
  enumType: ET
): enumValue is ET[keyof ET] {
  return Object.values(enumType).includes(enumValue);
}

export function chunkFieldsByRow(
  fields: FormFieldDefinition[],
  maxCols = 12
): FormFieldDefinition[][] {
  const rows: FormFieldDefinition[][] = [];
  let currentRow: FormFieldDefinition[] = [];
  let currentTotal = 0;

  fields.forEach((f) => {
    const colSpan = f.fieldConfig?.layoutOptions?.cols || 12;
    if (colSpan + currentTotal > maxCols) {
      // start a new row
      rows.push(currentRow);
      currentRow = [];
      currentTotal = 0;
    }
    currentRow.push(f);
    currentTotal += colSpan;
  });

  if (currentRow.length > 0) rows.push(currentRow);
  return rows;
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytes" : sizes[i] ?? "Bytes"
  }`;
}

export function getRequiredFieldNames(section: {
  fields: FormFieldDefinition[];
}): string[] {
  return section.fields
    .filter((field) => field.required === true)
    .map((field) => field.name);
}

export function calculateTableOfCostTotals(tableOfCostValues: any[]): Totals {
  const totalAnnualCost = (tableOfCostValues || []).reduce((acc, row) => {
    const annualUnits = Number(row?.projectedAnnualUnits) || 0;
    const unitCost = Number(row?.unitCostPerMonthAmount) || 0;
    return acc + annualUnits * unitCost;
  }, 0);

  const totalOtherFunds = (tableOfCostValues || []).reduce((acc, row) => {
    return acc + (Number(row?.projectedOtherFundsPerMonthAmount) || 0);
  }, 0);

  const totalSelfPay = (tableOfCostValues || []).reduce((acc, row) => {
    return acc + (Number(row?.selfPayPerMonthAmount) || 0);
  }, 0);

  const totalIDAPPCost = totalAnnualCost - totalOtherFunds - totalSelfPay;

  return { totalAnnualCost, totalOtherFunds, totalSelfPay, totalIDAPPCost };
}

export function computeTableOfCostRowTotals(row: TableOfCost) {
  const annualUnits = Number(row?.projectedAnnualUnits) || 0;
  const unitCost = Number(row?.unitCostPerMonthAmount) || 0;
  const computedAnnualCost = annualUnits * unitCost;
  const formattedAnnualCost = computedAnnualCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const projectedOtherFunds =
    Number(row?.projectedOtherFundsPerMonthAmount) || 0;
  const selfPay = Number(row?.selfPayPerMonthAmount) || 0;
  const idappCost = computedAnnualCost - projectedOtherFunds - selfPay;
  const formattedIdappCost = idappCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return {
    computedAnnualCost,
    formattedAnnualCost,
    idappCost,
    formattedIdappCost,
  };
}

/** Helper that checks date to see if plan is closed or currently active. */
export function getDateStatus(planStartDate?: string, planEndDate?: string) {
  // If start date is missing, default to inactive.
  if (!planStartDate) {
    return { isClosed: false, isInActiveDateRange: false };
  }

  const start = new Date(planStartDate);
  if (isNaN(start.getTime())) {
    return { isClosed: false, isInActiveDateRange: false };
  }

  const now = new Date();

  // If no end date is provided, treat the plan as open-ended.
  // The plan is active if the current date is on or after the start date.
  if (!planEndDate) {
    return { isClosed: false, isInActiveDateRange: now >= start };
  }

  const end = new Date(planEndDate);
  if (isNaN(end.getTime())) {
    return { isClosed: false, isInActiveDateRange: false };
  }

  const isClosed = now > end;
  const isInActiveDateRange = now >= start && now <= end;
  return { isClosed, isInActiveDateRange };
}


export function getColumns(fiscalYear?: string, fiscalQuarter?: string) {
  let fiscalLabel = "Current FY";
  if (fiscalYear && fiscalQuarter) {
    fiscalLabel = `${fiscalQuarter.toUpperCase()} ${fiscalYear}`;
  } else if (fiscalYear) {
    fiscalLabel = fiscalYear;
  }

  return [
    { key: "regionId", label: "Region" },
    { key: "csbId", label: "Case Management CSB" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "clientId", label: "Client ID (CCS ID#)" },
    { key: "stateHospital", label: "State Hospital" },
    { key: "stateHospitalId", label: "State Hospital ID# (Patient ID - MRN)" },
    {
      key: "stateHospitalAdmissionDate",
      label: "State Hospital Admission Date",
    },
    {
      key: "stateHospitalDischargeDate",
      label: "State Hospital Discharge Date",
    },
    { key: "planType", label: "Plan Type" },
    { key: "planStatus", label: "Plan Status" },
    { key: "planStartDate", label: "Plan Start Date" },
    { key: "planEndDate", label: "Plan End Date" },
    {
      key: "sumOfProjectedAnnualCost",
      label: "Sum of Projected Annual Cost",
    },
    {
      key: "sumOfProjectedOtherFunds",
      label: "Sum of Projected Other Funds (Medicaid, SSI, etc.)",
    },
    { key: "sumOfSelfPay", label: "Sum of Self Pay" },
    { key: "sumOfIdappCost", label: "Sum of IDAPP Cost" },
    {
      key: "totalDapFundsUsed",
      label: `Sum of Total DAP Funds Used for ${fiscalLabel} Expenses`,
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAxiosResponse(response: any): response is AxiosResponse<any, any> {
  return (
    response != null &&
    typeof response === "object" &&
    "status" in response &&
    "data" in response
  );
}

export function sortByLastUpdated<T extends { last_updated_date: string }>(
  arr: T[]
): T[] {
  return arr.sort(
    (a, b) =>
      // Date.parse converts ISO strings to epoch ms, so subtraction gives the correct ordering.
      Date.parse(b.last_updated_date) - Date.parse(a.last_updated_date)
  )
};
