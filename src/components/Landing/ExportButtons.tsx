import {  useState, useMemo } from "react";
import { ExportAsExcel, ExportAsPdf } from "@siamf/react-export";
import { Button } from "../ui/button";
import { ChevronDown, Download } from "lucide-react";

interface ExportButtonsProps {
  tableData?: any[]; 
  currentPlanStatus: string;
  disabled: boolean;
  referrer: string;
  buttonLabel: string;
}

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatTableOfCosts = (tableOfCost: []) => {
  let formattedTableOfCost = `No table of costs for this plan.`;
  if(tableOfCost !== null && tableOfCost?.length > 0) {
    formattedTableOfCost = ``;
    tableOfCost.map((table) => {
      // assuming these vars are available
      let { projectedAnnualUnits, projectedMonthsNeeded, projectedOtherFundsPerMonthAmount, selfPayPerMonthAmount, serviceCategory, unitCostPerMonthAmount } = table;

      unitCostPerMonthAmount = unitCostPerMonthAmount ?? 0;
      projectedOtherFundsPerMonthAmount = projectedOtherFundsPerMonthAmount ?? 0;
      projectedAnnualUnits = projectedAnnualUnits ?? 1;
      selfPayPerMonthAmount = selfPayPerMonthAmount ?? 0;
      projectedMonthsNeeded = projectedMonthsNeeded ?? 1;
      serviceCategory = serviceCategory ?? "Unknown Service Category";

      formattedTableOfCost += `
      ${serviceCategory}:\n
      Projected Months: ${projectedMonthsNeeded} month(s),\n
      Unit Cost: ${USDollar.format(unitCostPerMonthAmount)}\n
      Annual Units: ${projectedAnnualUnits} units,\n
      Other Funds: ${USDollar.format(projectedOtherFundsPerMonthAmount)},\n
      Self Pay: ${USDollar.format(selfPayPerMonthAmount)},\n
      IDAAP Cost: ${USDollar.format((unitCostPerMonthAmount*projectedAnnualUnits) - (projectedOtherFundsPerMonthAmount + selfPayPerMonthAmount))}\n\n
      `;
    });
  }

  return formattedTableOfCost;
}

const transformData = (data: any[], referrer: string): any[] => {
  try {
    switch(referrer) {
      case "idaap-summary":
        return data.map((item) => ({
          "Facility": item?.state_hospital || '',
          "Patient Name": `${item.first_name} ${item.middle_name} ${item.last_name}`,
          "MRN ID#": item.mrn,
          "Legal Status": item.legal_status,
          "Hospital Admission Date": item?.state_hospital_admission_date || '',
          "Hospital Discharge Date": item?.state_hospital_discharge_date || '',
          "Table of Costs": formatTableOfCosts(item.tableOfCost),
        }));
        break;
      case "idaap-landing":
        return data.map((item) => ({
          "Facility": item.organizationName,
          "Patient Name": `${item.first_name} ${item.last_name}`,
          "Data of Birth": item.dob,
          "MRN ID#": item.mrnId,
          "Plan Type": item.typeOfFunds,
          "Status": item.status,
          "Last Activity": item.last_updated_date,
        }));
        break;
      default:
        return data.map((item) => ({
          "Facility": item.organizationName,
          "Patient Name": `${item.first_name} ${item.last_name}`,
          "Data of Birth": item.dob,
          "MRN ID#": item.mrnId,
          "Plan Type": item.typeOfFunds,
          "Status": item.status,
          "Last Activity": item.last_updated_date,
        }));
      break;
    }
    
  } catch (error) {
    console.error(`error ${error}`);
  }
};

const ExportButtons: React.FC<ExportButtonsProps> = ({
  tableData = [], 
  currentPlanStatus,

  buttonLabel = "EXPORT",
  disabled = false,
  referrer = "idaap-landing",
}) => {
  const transformedData = useMemo(() => transformData(tableData, referrer), [tableData, referrer]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const IDAAP_LANDING_HEADERS = [
    "Facility",
    "Patient Name",
    "Date of Birth",
    "MRN ID#",
    "Plan Type",
    "Status",
    "Last Activity",
  ];
  
  const IDAAP_SUMMARY_HEADERS = [
    "Facility Name",
    "Patient Name",
    "MRN ID#",
    "Legal Status",
    "Hospital Admission Date",
    "Hospital Discharge Date",
    "Table of Costs",
  ];

  const fileName = `${currentPlanStatus}-file`;

  return (
    <div className="relative">
      <Button
        disabled={disabled}
        onClick={(e) => { e.preventDefault(); setDropdownOpen(!dropdownOpen)}} // triggering a reload on the plan summary page.
        className="select-none pl-[44px] pr-[7px] gap-1 uppercase ml-auto relative"
        variant="outline"
      >
        <div className="bg-[#71A042]/30 absolute left-1 top-1 bottom-1 w-[32px] rounded-md flex items-center justify-center">
          <Download />
        </div>
        {buttonLabel}
        <ChevronDown />
      </Button>

      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-0 p-2 bg-white shadow-lg rounded-md border z-50">
          <div className="flex gap-2">
            <ExportAsExcel
              data={transformedData}
              fileName={`${fileName}-excel`}
              headers={referrer === "idaap-landing" ? IDAAP_LANDING_HEADERS : IDAAP_SUMMARY_HEADERS}
            >
              {(props) => (
                <Button
                  className="text-[#00689a] font-bold select-none"
                  variant={"outline"}
                  {...props}
                >
                  Export as Excel
                </Button>
              )}
            </ExportAsExcel>
            <ExportAsPdf
              data={transformedData}
              fileName={`${fileName}-pdf`}
              headers={referrer === "idaap-landing" ? IDAAP_LANDING_HEADERS : IDAAP_SUMMARY_HEADERS}
              orientation="landscape"
              headerStyles={{
                fillColor: "gray",
                fontSize: 10,
                fontStyle: "normal",
                overflow: "visible",
                cellWidth: "wrap",
              }}
              title={`${currentPlanStatus}`}
            >
              {(props) => (
                <Button
                  className="text-[#00689a] font-bold select-none"
                  variant={"outline"}
                  {...props}
                >
                  Export as PDF
                </Button>
              )}
            </ExportAsPdf>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButtons;
