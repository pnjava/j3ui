import React from "react";
import {
  SectionDefinition,
  useStepCompletion,
} from "../../hooks/useStepCompletion";
import { Badge } from "../ui/badge";
import { cn, getDateStatus } from "../../lib/utils";
import {
  CheckCircle,
  SquarePen,
  FileClock,
  XCircle,
  FileIcon,
  CircleX,
  FilePenLine,
} from "lucide-react";
import { TableOfCost } from "../../lib/types/Plan";
import { useFormContext } from "react-hook-form";

/**
 * If `status` is provided, we show a status-based badge (e.g., Draft, Submitted, Approved).
 * Otherwise, if we have a `section`, we use the `useStepCompletion` hook to
 * display either “Complete” or a fraction, with the nuance that if the parent field
 * is “No”, we consider that section complete.
 */
interface PlanOverviewSectionBadgeProps {
  section?: SectionDefinition;
  status?: string;
  decisionText?: string;
  isCustomRatePlanModification?: boolean;
  memoryCareQ1DementiaValue?: boolean;
  isOutOfCatchmentValue?: boolean;
  isResidentialCareNeededValue?: boolean;
  planStartDate?: string;
  planEndDate?: string;
  // If the parent field is "No", we treat the entire section as complete
  parentFieldIsNo?: boolean;
  tableOfCostValues?: TableOfCost;
  hasReceivingCoordinatorConsulted?: boolean;
  receivingCoordinatorNotConsultedReason?: string;
  receivingCoordinatorConsulted?: string;
  receivingCoordinatorConsultedDate?: string;
}

// Common base classes for all badges
const BASE_BADGE_CLASSES =
  "px-3 py-1.5 rounded-3xl text-xs font-medium font-inter leading-none";

/** Central helper for building a <Badge> with consistent classes. */
function buildBadge({
  icon,
  text,
  extraClasses = "",
}: {
  icon?: React.ReactNode;
  text: string;
  extraClasses?: string;
}) {
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full", BASE_BADGE_CLASSES, extraClasses)}
    >
      {icon}
      {icon && " "}
      {text}
    </Badge>
  );
}

/** Returns a badge (or multiple badges) based on the `status`. */
function getStatusBadge(
  status: string,
  {
    decisionText,
    planStartDate,
    planEndDate,
    isCustomRatePlanModification,
  }: {
    decisionText?: string;
    planStartDate?: string;
    planEndDate?: string;
    isCustomRatePlanModification?: boolean;
  }
) {
  const { isClosed, isInActiveDateRange } = getDateStatus(
    planStartDate,
    planEndDate
  );

  // Special case: Draft + "request-changes"
  if (status.toLowerCase() === "draft" && decisionText === "request-changes") {
    return buildBadge({
      icon: <FilePenLine className="w-4 h-4 inline-block mr-1" />,
      text: "Changes Requested",
      extraClasses: "bg-[#ffeebd] border-[#FFDA70] text-[#6B5412]",
    });
  }

  // Common simpler statuses:
  // You can add or adjust icons, text, color combos here for easy reuse.
  const SIMPLE_STATUS_MAP: Record<
    string,
    { icon: React.ReactNode; text: string; classes: string }
  > = {
    draft: {
      icon: <SquarePen className="w-4 h-4 inline-block mr-1" />,
      text: "Draft",
      classes: "bg-[#B0D0E0] border-[#549ABB] text-[#002C41]",
    },
    submitted: {
      icon: <FileClock className="w-4 h-4 inline-block mr-1" />,
      text: "Regional manager check in progress",
      classes: "bg-[#FFEEBD] border-[#FFDA70] text-[#6B5412]",
    },
    rm_check: {
      icon: <FileClock className="w-4 h-4 inline-block mr-1" />,
      text: "Voting in progress",
      classes: "bg-[#FFEEBD] border-[#FFDA70] text-[#6B5412]",
    },
    approved: {
      icon: <CheckCircle className="w-4 h-4 inline-block mr-1" />,
      text: "Approved",
      classes: "bg-[#d4e2c4] border-[#A3C080] text-[#31441C]",
    },
    closed: {
      icon: <CircleX className="w-4 h-4 inline-block mr-1" />,
      text: "Closed",
      classes: "bg-[#CACBCC] border-[#8C8E90] text-[#232526]",
    },
    rejected: {
      icon: <XCircle className="w-4 h-4 inline-block mr-1" />,
      text: "Rejected",
      classes: "bg-red-300 border text-[#6B0000]",
    },
  };

  // If the status matches one of the simpler statuses, build that:
  const lowerStatus = status.toLowerCase();
  if (SIMPLE_STATUS_MAP[lowerStatus]) {
    const { icon, text, classes } = SIMPLE_STATUS_MAP[lowerStatus];
    return buildBadge({
      icon,
      text,
      extraClasses: classes,
    });
  }

  // Complex statuses:
  switch (lowerStatus) {
    case "emergency_approved": {
      let text = "Emergency approved";
      let classes = "bg-[#d4e2c4] border-[#A3C080] text-[#31441C]";
      let icon = <CheckCircle className="w-4 h-4 inline-block mr-1" />;

      if (isClosed) {
        text = "Closed";
        classes = "bg-[#CACBCC] border-[#8C8E90] text-[#232526]";
        icon = <CircleX className="w-4 h-4 inline-block mr-1" />;
      } else if (isInActiveDateRange) {
        text = "Active";
        classes = "bg-[#d4e2c4] border-[#A3C080] text-[#31441C]";
        icon = <CheckCircle className="w-4 h-4 inline-block mr-1" />;
      }
      return buildBadge({ icon, text, extraClasses: classes });
    }

    case "rc_approved": {
      let text = "Regional approval complete";
      let classes = "bg-[#d4e2c4] border-[#A3C080] text-[#31441C]";
      let icon = <CheckCircle className="w-4 h-4 inline-block mr-1" />;

      if (isClosed) {
        text = "Closed";
        classes = "bg-[#CACBCC] border-[#8C8E90] text-[#232526]";
        icon = <CircleX className="w-4 h-4 inline-block mr-1" />;
      } else if (isInActiveDateRange && !isCustomRatePlanModification) {
        text = "Active";
        classes = "bg-[#d4e2c4] border-[#A3C080] text-[#31441C]";
        icon = <CheckCircle className="w-4 h-4 inline-block mr-1" />;
      }
      const needsExtraBadge =
        isCustomRatePlanModification && (!isClosed || !isInActiveDateRange);

      return (
        <div className="flex items-center gap-2">
          {buildBadge({ icon, text, extraClasses: classes })}
          {needsExtraBadge &&
            !isClosed &&
            buildBadge({
              icon: <FileIcon className="w-4 h-4 inline-block mr-1" />,
              text: "Statewide approval incomplete",
              extraClasses: "bg-[#ffeebd] border-[#FFDA70] text-[#6B5412]",
            })}
        </div>
      );
    }

    case "sc_approved": {
      let text = "Regional approval complete";
      let classes = "bg-[#d4e2c4] border-[#A3C080] text-[#31441C]";
      let icon = <CheckCircle className="w-4 h-4 inline-block mr-1" />;

      if (isClosed) {
        text = "Closed";
        classes = "bg-[#CACBCC] border-[#8C8E90] text-[#232526]";
        icon = <CircleX className="w-4 h-4 inline-block mr-1" />;
      } else if (isInActiveDateRange) {
        text = "Active";
        classes = "bg-[#d4e2c4] border-[#A3C080] text-[#31441C]";
        icon = <CheckCircle className="w-4 h-4 inline-block mr-1" />;
      }

      return (
        <div className="flex items-center gap-2">
          {buildBadge({ icon, text, extraClasses: classes })}
          {isCustomRatePlanModification &&
            !isClosed &&
            !isInActiveDateRange &&
            buildBadge({
              icon: <CheckCircle className="w-4 h-4 inline-block mr-1" />,
              text: "Statewide approval complete",
              extraClasses: "bg-[#d4e2c4] border-[#A3C080] text-[#31441C]",
            })}
        </div>
      );
    }

    case "sc_rejected":
      return (
        <div className="flex items-center gap-2">
          {buildBadge({
            icon: <CheckCircle className="w-4 h-4 inline-block mr-1" />,
            text: "Regional approval complete",
            extraClasses: "bg-[#d4e2c4] border-[#A3C080] text-[#31441C]",
          })}
          {isCustomRatePlanModification &&
            !isClosed &&
            !isInActiveDateRange &&
            buildBadge({
              icon: <XCircle className="w-4 h-4 inline-block mr-1" />,
              text: "Statewide approval rejected",
              extraClasses: "bg-[#ffb0b0] border-[#FF5454] text-[#6B0000]",
            })}
        </div>
      );

    case "rc_rejected":
      return buildBadge({
        icon: <CircleX className="w-4 h-4 inline-block mr-1" />,
        text: "Regional approval rejected",
        extraClasses: "bg-[#ffb0b0] border-[#FF5454] text-[#6B0000]",
      });

    default:
      // Fallback styling with the raw status as text
      return buildBadge({
        text: status,
        extraClasses: "bg-[#ffeebd] border-[#FFDA70] text-[#6B5412]",
      });
  }
}

export function PlanOverviewSectionBadge({
  section,
  status,
  decisionText,
  isCustomRatePlanModification,
  parentFieldIsNo,
  tableOfCostValues,
  planStartDate,
  planEndDate,
  memoryCareQ1DementiaValue,
  isOutOfCatchmentValue,
  isResidentialCareNeededValue,
  hasReceivingCoordinatorConsulted,
  receivingCoordinatorNotConsultedReason,
  receivingCoordinatorConsulted,
  receivingCoordinatorConsultedDate,
}: PlanOverviewSectionBadgeProps) {
  // Fallback so we always call the hook (avoid conditional hooking).
  const fallbackSection: SectionDefinition = {
    sectionId: "fallback",
    requiredFields: [],
  };
  const activeSection = section || fallbackSection;
  const { completedCount, totalCount, fraction, isComplete } =
    useStepCompletion(activeSection);

  // If the parent is "No", override isComplete = true
  let finalIsComplete = parentFieldIsNo ? true : isComplete;
  let finalFraction = parentFieldIsNo ? 1 : fraction;
  let finalCompletedCount = parentFieldIsNo ? totalCount : completedCount;

  if (activeSection.sectionId === "MEMORY_CARE") {
    if (memoryCareQ1DementiaValue === false) {
      finalIsComplete = true;
      finalFraction = 1;
      finalCompletedCount = totalCount;
    }
  }
  if (activeSection.sectionId === "CATCHMENT_PLAN") {
    if (isOutOfCatchmentValue === false) {
      finalIsComplete = true;
      finalFraction = 1;
      finalCompletedCount = totalCount;
    } else if (isOutOfCatchmentValue === true) {
      if (
        (hasReceivingCoordinatorConsulted === false
        && receivingCoordinatorNotConsultedReason) ||
        (hasReceivingCoordinatorConsulted === true &&
          receivingCoordinatorConsulted && receivingCoordinatorConsultedDate
        )
      ) {
        finalIsComplete = true;
        finalFraction = 1;
        finalCompletedCount = totalCount;
      }
    }
  }
  if (activeSection.sectionId === "DAP_RESIDENTIAL_RATE") {
    const { getValues } = useFormContext();
    const data = getValues();
    if (isResidentialCareNeededValue === false) {
      finalIsComplete = true;
      finalFraction = 1;
      finalCompletedCount = totalCount;
    } else if (isResidentialCareNeededValue === true) {
      const residentialFields = [
        "facilityLocationCsbRegion",
        "potentialPlacementFacilityType",
        "adlsAndAmbulation",
        "continence",
        "eatingAndFeeding",
        "bathingDressingToiletingAndTransfers",
        "majorActiveDiagnoses1",
        "majorActiveDiagnoses2",
        "majorActiveDiagnoses3",
        "sensoryFunctions",
        "behaviorPattern",
        "personCompletingRequest",
      ];
  
      let completed = 0;
      let required = residentialFields.length;
  
      for (const key of residentialFields) {
        const val = data[key];
        const isFilled = val !== undefined && val !== null && (typeof val !== "string" || val.trim() !== "");
        if (isFilled) completed++;
      }
  
      // Check for critical behavior pattern and then nested behaviorFields
      const criticalPatterns = [
        " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
        " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more",
      ];
  
      const behaviorFields = [
        "behavioralInterventionAssaults",
        "behavioralInterventionDestruction",
        "behavioralInterventionStealing",
        "behavioralInterventionSelfInjury",
        "behavioralInterventionIntrusiveBehavior",
        "behavioralInterventionSuicide",
        "behavioralInterventionSexualAggression",
        "behavioralInterventionNonAggressive",
        "behavioralInterventionTantrums",
        "behavioralInterventionWandering",
        "behavioralInterventionSubstanceAbuse",
        "behavioralInterventionMaintenance",
      ];
  
      const behaviorPatternValue = data.behaviorPattern;
  
      if (criticalPatterns.includes(behaviorPatternValue)) {
        required += behaviorFields.length;
  
        for (const key of behaviorFields) {
          const val = data[key];
          const isFilled = val !== undefined && val !== null && (typeof val !== "string" || val.trim() !== "");
          if (isFilled) completed++;
  
          // If support level requires notes
          const supportLevels = ["some support needed", "extensive support needed"];
          const normalizedValue = typeof val === "string" ? val.trim().toLowerCase() : "";
          if (supportLevels.includes(normalizedValue)) {
            const notesKey = `${key}Notes`;
            required++;
            const notesVal = data[notesKey];
            const isNotesFilled = notesVal !== undefined && notesVal !== null && (typeof notesVal !== "string" || notesVal.trim() !== "");
            if (isNotesFilled) completed++;
          }
        }
      }
  
      finalCompletedCount = completed;
      finalFraction = required > 0 ? completed / required : 0;
      finalIsComplete = completed === required;
    }
  }
  
  if (activeSection.sectionId === "CUSTOM_RATE_PLAN") {
    const { getValues } = useFormContext();
    const data = getValues();
  
    const customRatePlanRequiredFields: { key: keyof typeof data; label: string }[] = [
      { key: "applicationDate", label: "Application Date" },
      { key: "csbContactInformation", label: "CSB Contact Information" },
      { key: "providerContactInformation", label: "Provider Contact Information" },
      { key: "serviceRequested", label: "Service Requested" },
      { key: "whoWillProvideTheService", label: "Who Will Provide The Service" },
      { key: "specifyTimes", label: "Specify Times" },
    ];
  
    let completed = 0;
    let required = customRatePlanRequiredFields.length;
  
    // Check base required fields
    for (const field of customRatePlanRequiredFields) {
      const value = data[field.key];
      const isBlank = value === undefined || value === null || (typeof value === "string" && value.trim() === "");
      if (!isBlank) completed++;
    }

    required++;
    const serviceRequestedValue = data.serviceRequested;
  
    if (serviceRequestedValue === "Transitional Support") {
      const isBlank = !data.transitionalService || data.transitionalService.trim() === "";
      if (!isBlank) completed++;
    } else {
      const isBlank = !data.allOtherServices || data.allOtherServices.trim() === "";
      if (!isBlank) completed++;
    }

    if (serviceRequestedValue !== "Transitional Support") {
      required++;
      const val = data.numberOfHoursRequestedPerDay;
      const isValid = typeof val === "number" && val >= 1 && val <= 24;
      if (isValid) completed++;
    }

    if (serviceRequestedValue === "Program Oversight") {
      required++;
      const selected = [
        data.forProgrammaticOversightCheckbox1,
        data.forProgrammaticOversightCheckbox2,
        data.forProgrammaticOversightCheckbox3,
        data.forProgrammaticOversightCheckbox4,
        data.forProgrammaticOversightCheckbox5,
        data.forProgrammaticOversightCheckbox6,
      ];
      const selectedCount = selected.filter(v => v).length;
      if (selectedCount >= 3) completed++;
    }
  
    required++;
    if (data.documentationFiles?.length > 0) completed++;
  
    finalCompletedCount = completed;
    finalFraction = required > 0 ? completed / required : 0;
    finalIsComplete = completed === required;
  }    
  
  // 1) If there's a tableOfCost, show the table-of-cost badge
  if (tableOfCostValues && tableOfCostValues.length > 0) {
    const tableComplete = tableOfCostValues.length >= 1;
    return buildBadge({
      icon: <CheckCircle className="w-4 h-4 inline-block mr-1" />,
      text: tableComplete ? "Complete" : "Incomplete",
      extraClasses: cn(
        "text-[#6b5412]",
        tableComplete && "bg-[#d4e2c4] border-[#A3C080] text-[#31441C]"
      ),
    });
  }

  // 2) If there's a `status`, use the status-based logic
  if (status) {
    return getStatusBadge(status, {
      decisionText,
      planStartDate,
      planEndDate,
      isCustomRatePlanModification,
    });
  }

  // 3) Otherwise, use the step-completion logic
  const percentage = Math.round(finalFraction * 100);
  if (finalIsComplete) {
    return buildBadge({
      icon: <CheckCircle className="w-4 h-4 inline-block mr-1" />,
      text: "Complete",
      extraClasses:
        "bg-[#d4e2c4] border-[#A3C080] text-[#31441C] border border-[#A3C080]",
    });
  }
  // Incomplete => show fraction
  return buildBadge({
    text: `${percentage}% (${finalCompletedCount}/${totalCount})`,
    extraClasses: "text-[#6b5412] border border-[#8C8E90]",
  });
}
