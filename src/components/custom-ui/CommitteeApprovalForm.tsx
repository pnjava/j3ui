import React, { useContext } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormRow } from "../custom-ui/FormRow";
import { FormField } from "../custom-ui/FormField";
import { Button } from "../ui/button";
import { calculateTableOfCostTotals, cn } from "../../lib/utils";
import { Plan } from "../../lib/types/Plan";
import { StoreContext } from "../../context/Store";

interface CommitteeApprovalFormProps {
  committeeType: "regional" | "statewide" | "regionalManager";
  title: string;
  onSubmit?: (committee: "regional" | "statewide" | "regionalManager") => void;
  customRateApprovalFields: any[];
  className?: string;
  readOnly?: boolean;
  isCustomRatePlanModification?: boolean;
  plan?: Plan;
}

const CommitteeApprovalForm: React.FC<CommitteeApprovalFormProps> = ({
  committeeType,
  title,
  onSubmit,
  customRateApprovalFields,
  className = "",
  readOnly = false,
  isCustomRatePlanModification = false,
  plan,
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { user } = useContext(StoreContext);
  const userRoles: string[] = user.currentUser?.role || [];
  const isCtsUser = userRoles.includes("DBHDS_DAP_CTS");
  const applicationStatus = plan?.status;
  const effectiveReadOnly = readOnly || isCtsUser;
  const canEditCtsNotes =
    committeeType === "regionalManager" &&
    isCtsUser &&
    applicationStatus === "SUBMITTED";

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  let personFieldName: string,
    notesFieldName: string,
    statusFieldName: string,
    notesCtsFieldName: string | undefined;
  if (committeeType === "regionalManager") {
    personFieldName = "customRatePlanRegionalManagerPersonApproving";
    notesFieldName = "customRatePlanRegionalManagerApprovalNotes";
    statusFieldName = "customRatePlanRegionalManagerApprovalStatus";
    notesCtsFieldName = "customRatePlanCTSApprovalComments";
  } else {
    const properCommitteeType =
      committeeType === "statewide" ? "StateWide" : capitalize(committeeType);
    personFieldName = `customRatePlan${properCommitteeType}CommitteePersonApproving`;
    notesFieldName = `customRatePlan${properCommitteeType}CommitteeApprovalNotes`;
    statusFieldName = `customRatePlan${properCommitteeType}CommitteeApprovalStatus`;
    notesCtsFieldName = undefined;
  }

  const approvalStatus = useWatch({
    name: statusFieldName,
    control,
  });

  const isApproveHighlighted = approvalStatus === "approve";
  const isRejectHighlighted = approvalStatus === "reject";
  const isRequestChangesHighlighted = approvalStatus === "request-changes";
  const isEmergencyHighlighted = approvalStatus === "emergency";

  const handleDecisionClick = (
    decision: "approve" | "reject" | "request-changes" | "emergency"
  ) => {
    setValue(statusFieldName, decision);
  };

  // Watch the entire tableOfCost array
  const tableOfCostValues = useWatch({
    control,
    name: "tableOfCost",
  });

  const { totalIDAPPCost } = calculateTableOfCostTotals(
    tableOfCostValues || []
  );

  return (
    <div
      className={cn(
        "px-12 py-8 bg-white rounded shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)] border border-[#cacbcc] flex-col justify-start items-start inline-flex w-full",
        className
      )}
    >
      <div className="text-[#8c8e90] text-lg font-normal font-inter leading-7">
        <span className="text-[#3b3e40] text-lg font-medium">
          {title.slice(0, 7)}
        </span>
        {title.slice(7)}
      </div>

      <div className="w-full border border-[#ebebeb] my-4"></div>
      <div className="w-full mt-2 flex">
        <FormRow>
          <Controller
            name={personFieldName}
            control={control}
            render={({ field }) => {
              const fieldConfig = customRateApprovalFields.find(
                (f: any) => f.name === personFieldName
              );

              return (
                <FormField
                  field={fieldConfig}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors[personFieldName]}
                  viewOnly={effectiveReadOnly}
                />
              );
            }}
          />
        </FormRow>
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex ml-4">
          <div className="self-stretch flex items-center gap-1">
            <div className="text-[#ff0000] text-sm font-medium font-inter leading-tight">
              *
            </div>
            <div className="text-[#3b3e40] text-sm font-medium font-inter leading-tight">
              {committeeType === "regional" ? (
                <>Plan approval</>
              ) : committeeType === "statewide" ? (
                <>Custom rate approval</>
              ) : (
                <>Is plan ready for regional group voting?</>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              disabled={effectiveReadOnly}
              className={cn(
                "px-4 py-2 rounded-md border text-base font-medium font-inter leading-normal",
                isApproveHighlighted
                  ? "bg-[#00689a] text-white border-[#00689a]"
                  : "bg-white text-[#3b3e40] border-[#cacbcc]",
                "hover:bg-[#00689a] hover:border-[#00689a]"
              )}
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                if (!readOnly) {
                  handleDecisionClick("approve");
                }
              }}
            >
              {committeeType === "regionalManager" ? "Yes" : "Approve"}
            </Button>
            {committeeType !== "regionalManager" && (
              <Button
                disabled={effectiveReadOnly}
                className={cn(
                  "px-5 py-2 rounded-md border text-base font-medium font-inter leading-normal",
                  isRejectHighlighted
                    ? "bg-[#ff0000] text-white border-[#ff0000]"
                    : "bg-white text-[#3b3e40] border-[#cacbcc]",
                  "hover:bg-[#ff0000] hover:border-[#ff0000]"
                )}
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  if (!readOnly) {
                    handleDecisionClick("reject");
                  }
                }}
              >
                Reject
              </Button>
            )}

            {committeeType === "regionalManager" && (
              <Button
                disabled={effectiveReadOnly}
                className={cn(
                  "px-5 py-2 rounded-md border text-base font-medium font-inter leading-normal",
                  isRequestChangesHighlighted
                    ? "bg-[#ffeebd] text-[#3b3e40] border-[#ffeebd]"
                    : "bg-white text-[#3b3e40] border-[#cacbcc]",
                  "hover:bg-[#ffeebd] hover:border-[#ffeebd]"
                )}
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  if (!readOnly) {
                    handleDecisionClick("request-changes");
                  }
                }}
              >
                No, request changes
              </Button>
            )}
            {committeeType === "regionalManager" &&
              plan?.typeOfFunds === "ONE_TIME" &&
              !isCustomRatePlanModification && (
                <Button
                  disabled={effectiveReadOnly || totalIDAPPCost >= 7001}
                  className={cn(
                    "px-4 py-2 rounded-md border text-base font-medium font-inter leading-normal",
                    isEmergencyHighlighted
                      ? "bg-[#ff0000] text-white border-[#ff0000]"
                      : "bg-white text-[#3b3e40] border-[#cacbcc]",
                    "hover:bg-[#ff0000] hover:border-[#ff0000]"
                  )}
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!readOnly) {
                      handleDecisionClick("emergency");
                    }
                  }}
                >
                  Emergency
                </Button>
              )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <FormRow>
          <Controller
            name={notesFieldName}
            control={control}
            render={({ field }) => {
              const fieldConfig = customRateApprovalFields.find(
                (f: any) => f.name === notesFieldName
              );

              return (
                <FormField
                  field={fieldConfig}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors[notesFieldName]}
                  viewOnly={effectiveReadOnly}
                />
              );
            }}
          />
        </FormRow>
        {committeeType === "regionalManager" && notesCtsFieldName && (
          <FormRow>
            <Controller
              name={notesCtsFieldName}
              control={control}
              render={({ field }) => {
                const fieldConfig = customRateApprovalFields.find(
                  (f) => f.name === notesCtsFieldName
                );
                return (
                  <FormField
                    field={fieldConfig}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors[notesCtsFieldName]}
                    viewOnly={readOnly || !canEditCtsNotes}
                  />
                );
              }}
            />
          </FormRow>
        )}
      </div>
      <div className="w-full flex justify-end">
        <Button
          disabled={readOnly}
          className="px-6 py-2 bg-[#00689a] rounded-md border border-[#cacbcc] text-white font-medium font-inter leading-normal hover:bg-[#00689a] hover:border-[#00689a]"
          onClick={(e) => {
            e.preventDefault();
            if (!readOnly && onSubmit) {
              onSubmit(committeeType);
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CommitteeApprovalForm;
