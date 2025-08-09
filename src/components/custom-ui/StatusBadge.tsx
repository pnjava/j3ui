import { ElementType } from "react";

interface StatusBadgeProps {
  badgeColor: string;
  status: string;
  IconComponent: ElementType;
}

const StatusBadge = ({ badgeColor, status, IconComponent }: StatusBadgeProps) => (
  <div className={`px-2 py-1 ${badgeColor} rounded-3xl justify-center items-center gap-1 flex`}>
    <IconComponent className="w-4 h-4 relative  overflow-hidden" />
    <div className="text-center text-[#003955] text-xs font-medium font-inter leading-none">{status}</div>
  </div>
);

export default StatusBadge;
