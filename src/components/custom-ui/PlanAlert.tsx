import React from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Info } from "lucide-react";

export type AlertMessageType =
  | "submission"
  | "ctsComment"
  | "regionalApproval"
  | "regionalManagerApproval"
  | "regionalRejectiom"
  | "regionalRequestChanges"
  | "statewideApproval"
  | "statewideRejection"
  | "emergency"
  | "modify"
  | null;

interface PlanAlertProps {
  planId: string;
  typeOfFunds: string;
  firstName?: string;
  messageType: AlertMessageType;
  onDismiss: () => void;
  isCustomRateModification?: boolean;
}

const PlanAlert: React.FC<PlanAlertProps> = ({
  planId,
  typeOfFunds,
  firstName,
  messageType,
  onDismiss,
  isCustomRateModification = false,
}) => {
  const actionMessages: Record<Exclude<AlertMessageType, null>, string> = {
    submission: "has successfully been submitted",
    ctsComment: "has successfully been submitted",
    regionalApproval: "has received regional approval",
    regionalManagerApproval: "has been approved for voting",
    regionalRejectiom: "has received regional rejection",
    regionalRequestChanges: "has received request for changes",
    modify: "has been modified",
    emergency: "has been emergency approved",
    statewideApproval: "has received statewide approval",
    statewideRejection: "has received statewide rejection",
  };

  // Determine the action text based on messageType.
  const action = messageType
    ? actionMessages[messageType as Exclude<AlertMessageType, null>]
    : "";

  // For non-custom messages, determine the funds text.
  const fundText =
    typeOfFunds === "ONGOING"
      ? "On going"
      : typeOfFunds === "ONE_TIME"
      ? "One time"
      : "";

  // Compose the message.
  let message = "";
  if (isCustomRateModification) {
    if (messageType === "submission") {
      // For submission, include firstName if available.
      message = `Your Custom rate application for ${
        firstName ? `${firstName}’s ` : ""
      }plan #${planId.slice(-5)} ${action}!`;
    } else {
      message = `Your Custom rate application for plan #${planId.slice(
        -5
      )} ${action}!`;
    }
  } else if (messageType === "ctsComment") {
    message = `Your comment ${action}!`;
  } else {
    message = `${fundText} plan #${planId.slice(-5)} ${action}!`;
  }
  return (
    <div className="fixed top-20 left-0 right-0 z-50 flex justify-center transform translate-y-[50px]">
      <Alert
        variant="default"
        className="w-full max-w-4xl p-0 bg-slate-200 shadow-[2px_7px_9px_0px_rgba(0,0,0,0.07)] shadow-[4px_4px_12px_4px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-cyan-600"
      >
        <div className="flex items-center justify-between">
          <div className=" p-2 rounded p-4">
            <Info className="w-6 h-6 inline-block mr-1" />
          </div>
          <AlertDescription className="text-[#3b3e40] text-sm font-normal font-inter leading-tight p-4">
            {message}
          </AlertDescription>
          <button
            className="text-[#004a6d] text-sm font-medium font-inter leading-normal p-4"
            onClick={onDismiss}
          >
            Dismiss
          </button>
        </div>
      </Alert>
    </div>
  );
};

export default PlanAlert;
