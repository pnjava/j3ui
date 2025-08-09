import React, { useContext } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../ui/button";
import { PermissionWrapper } from "../../context/PermissionWrapper";
import { StoreContext } from "../../context/Store";
import { useFormContext } from "react-hook-form";

interface PlanAccordionSectionProps {
  sectionKey: string;
  hidden?: boolean;
  title: string;
  badge?: React.ReactNode;
  onModify?: () => void;
  allowedRoles?: string[];
  applicationStatus: string;
  planRegionId?: string;
  planCsbId?: string;
  children: React.ReactNode;
}

const PlanAccordionSection: React.FC<PlanAccordionSectionProps> = ({
  sectionKey,
  hidden = false,
  title,
  badge,
  onModify,
  allowedRoles = [],
  applicationStatus,
  planRegionId,
  planCsbId,
  children,
}) => {
  const isMemoryCare = sectionKey.toUpperCase() === "MEMORY_CARE";
  // Get user details from StoreContext
  const { user } = useContext(StoreContext);
  const userRegion = user.currentUser?.region;
  const userRoles: string[] = user.currentUser.role || [];

  const { watch } = useFormContext();
  const isCustomRatePlanModification = watch("isCustomRatePlanModification");

  const adminRoles = ["DBHDS_DAP_PROGRAM_ADMIN", "DBHDS_DAP_CTS"];
  const isAdmin = userRoles.some((r) => adminRoles.includes(r));

  const isSameRegion = planRegionId
    ? Array.isArray(userRegion)
      ? userRegion.includes(planRegionId)
      : userRegion === planRegionId
    : false;
  const csbRoles = ["DBHDS_DAP_CSB_LIAISON", "DBHDS_DAP_CSB_DAP_COORDINATOR"];
  const isCsbRole = userRoles.some((r) => csbRoles.includes(r));
  const isCsbMatch = isCsbRole && user.currentUser?.csbId === planCsbId;

  const canModifyTableOfCost = () => {
    if (sectionKey !== "tableOfCost" || !onModify) return false;

    const byRM =
      userRoles.includes("DBHDS_DAP_RM") &&
      (applicationStatus === "DRAFT" || applicationStatus === "SUBMITTED");

    const byAdminCustom =
      userRoles.includes("DBHDS_DAP_PROGRAM_ADMIN") &&
      applicationStatus === "RC_APPROVED" &&
      isCustomRatePlanModification;

    return byRM || byAdminCustom;
  };

  const canModifyGeneralSection = () => {
    if (!onModify) return false;

    if (applicationStatus !== "DRAFT") return false;

    if (isAdmin) return true;

    if (isCsbRole) {
      return isCsbMatch;
    }

    return isSameRegion;
  };

  const canModifyApprovedDischargeRequest = () => {
    if (sectionKey.toUpperCase() !== "DISCHARGE_REQUEST") return false;

    const approved = [
      "EMERGENCY_APPROVED",
      "RC_APPROVED",
      "SC_APPROVED",
    ].includes(applicationStatus);

    const byCsbOrRm = userRoles.some((r) =>
      [
        "DBHDS_DAP_CSB_LIAISON",
        "DBHDS_DAP_CSB_DAP_COORDINATOR",
        "DBHDS_DAP_RM",
      ].includes(r)
    );

    return approved && byCsbOrRm;
  };

  // Show modify button if:
  // - For the "tableOfCost" section: if onModify exists, the user is a Regional Manager,
  //   and the application status is either DRAFT or SUBMITTED.
  // - For other sections: if onModify exists, the user is in the same region, and the application status is DRAFT.
  // Additionally, hide the modify button for CTS users unless it's a Memory Care section.
  // - ADO 4009 -- show Modify on Discharge Request section for an active / approved plan
  // to allow Liaison, Coordinator, or RM to update the plan_end_date, and NOT have it set the plan to DRAFT.

  let finalAllowedRoles = allowedRoles;
  if (isMemoryCare && applicationStatus === "DRAFT") {

    finalAllowedRoles = Array.from(new Set([...allowedRoles, "DBHDS_DAP_CTS"]));
  } else if (!isMemoryCare) {
    finalAllowedRoles = allowedRoles.filter((role) => role !== "DBHDS_DAP_CTS");
  }
  const showModify =
    Boolean(onModify) &&
    (canModifyTableOfCost() ||
      canModifyGeneralSection() ||
      canModifyApprovedDischargeRequest());


  return (
    <AccordionItem
      key={`planOverview${sectionKey}`}
      value={`planOverview${sectionKey}`}
      className={hidden ? "hidden" : ""}
    >
      <AccordionTrigger className="bg-white px-8">
        <div className="flex items-center justify-between w-full pr-8">
          <div className="flex items-center">
            <span className="text-[#232526] text-2xl font-semibold font-inter leading-loose">
              {title}
            </span>
            <span className="flex-1 px-5">{badge}</span>
          </div>
          <div>
            {showModify && (
              <PermissionWrapper

              allowedRoles={finalAllowedRoles}

                fallbackMode="hide"
              >
                {(readOnly) => (
                  <span
                    className={cn(
                      "mr-auto",
                      buttonVariants({ variant: "outline" })
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!readOnly && onModify) {
                        onModify();
                      }
                    }}
                  >
                    Modify
                  </span>
                )}
              </PermissionWrapper>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="bg-white rounded-t pt-8 px-8 pb-8">{children}</div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PlanAccordionSection;
