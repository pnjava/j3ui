import { ElementType, useEffect, useState } from "react";

interface PlanStatusBadgeProps {
  badgeColor?: string;
  status: string;
  IconComponent: ElementType;
}

const PlanStatusBadge = ({
  badgeColor,
  status,
  IconComponent,
}: PlanStatusBadgeProps) => {
  const [displayStatus, setDisplayStatus] = useState(status);
  const [badgeBgColor, setBadgeBgColor] = useState(badgeColor ?? "#e3d09c");

  useEffect(() => {
    let displayStatus = "";
    switch (status) {
      case "submitted":
        displayStatus = "In review";
        break;
      case "expiring":
        displayStatus = "Close to expiration";
        break;
      case "sc_approved":
        displayStatus = "Approved";
        break;
      default:
        displayStatus = toUpperCase(status);
        break;
      }

    setDisplayStatus(displayStatus);

    const determinedColor = badgeColor ? badgeColor : getBadgeBgColor(status);
    setBadgeBgColor(determinedColor);
  }, [status]);

  useEffect(() => {}, [badgeBgColor]);

  return (
    <div className={`px-2 py-1 bg-[${badgeBgColor}] rounded-3xl justify-center items-center gap-1 flex`}
    >
      <IconComponent className="w-4 h-4 relative  overflow-hidden" />
      <div className="text-center text-[#003955] text-xs font-medium font-inter leading-none">
        {displayStatus}
      </div>
    </div>
  );
};

const toUpperCase = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const getBadgeBgColor = (status: string) => {
  let badgeBgColor = "#e3d09c";
  switch (status) {
    case "draft":
      badgeBgColor = "#b0d0e0";
      break;
    case "submitted":
      badgeBgColor = "#e3d09c";
      break;
    case "sc_approved":
      badgeBgColor = "#d4e2c4";
      break;
    case "expiring":
      badgeBgColor = "#ffb0b0";
      break;
    default:
      badgeBgColor = "#e3d09c";
      break;
  }

  return badgeBgColor;
};

export default PlanStatusBadge;
