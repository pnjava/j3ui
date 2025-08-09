import { Info } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
} from "../ui/select";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";

import { useNavigate } from "react-router-dom";

import { X } from "lucide-react";

interface FilterPanelProps {
  format: string;
  onFormatChange: (value: string) => void;
  approvalStatus: string;
  onApprovalStatusChange: (value: string) => void;
  resetFilter: () => void;
}

const formatOptions = [
  { label: "Virtual (Zoom Link)", value: "Virtual" },
  { label: "In-Person (Address)", value: "InPerson" },
  { label: "Hybrid", value: "Hybrid" },
];

const approvalStatusOptions = [
  { label: "Approved", value: "Approved" },
  { label: "Not Approved", value: "Not Approved" },
  { label: "Waiting Approval", value: "Waiting Approval" },
];

const FilterPanel = ({
  format,
  onFormatChange,
  approvalStatus,
  onApprovalStatusChange,
  resetFilter,
}: FilterPanelProps) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-white border border-[#e1e1e1] flex-col justify-start items-start gap-4 inline-flex">
      <div className="self-stretch h-11 flex-col justify-start items-start gap-3 flex">
        <div className="self-stretch justify-start items-center inline-flex">
          <div className="grow shrink basis-0 h-6 justify-start items-center gap-1 flex">
            <div className="text-[#3b3e40] text-lg font-semibold font-inter leading-normal">
              Find Training
            </div>
            <div className="p-1 bg-white rounded justify-start items-center gap-2 flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info
                      color="#02796b"
                      className="w-4 h-4 relative  overflow-hidden"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="w-auto p-3 flex flex-col gap-2"
                    side="left"
                    align="center"
                  >
                    <span className="text-gray-600">
                      Use Training Format and Approval Status to filter
                      trainings. If you want to create a new training, Click
                      Create button.
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="px-6 h-8 border-[#00689a] gap-2"
              onClick={resetFilter}
              disabled={!format && !approvalStatus}
            >
              <div className="text-[#00689a] text-xs font-medium font-inter leading-none">
                Reset Filter
              </div>
            </Button>
            <Button
              variant="outline"
              className="px-6 h-8 border-[#00689a] gap-2"
              onClick={() =>
                navigate(
                  `/${
                    location.pathname.toLowerCase().includes("revive")
                      ? "revive/"
                      : "vaprs/"
                  }trainer/new-training`
                )
              }
            >
              <div className="text-[#00689a] text-xs font-medium font-inter leading-none">
                Create
              </div>
            </Button>
          </div>
        </div>
        <div className="self-stretch h-[0px] border border-[#eeeeef]"></div>
      </div>
      <div className="flex justify-center gap-6 w-full">
        <div className="gap-2 items-center w-full">
          <div className="text-[#006891a] pb-2 text-sm font-regular">
            Training Format
          </div>
          <div className="w-full relative">
            <Select value={format} onValueChange={onFormatChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Training Format" />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!!format && (
              <button
                onClick={() => onFormatChange("")}
                className="absolute right-8 top-[12px] text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        <div className="gap-2 items-center w-full">
          <div className="text-[#006891a] pb-2 text-sm font-regular">
            Approval Status
          </div>
          <div className="w-full relative">
            <Select
              value={approvalStatus}
              onValueChange={onApprovalStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Approval Status" />
              </SelectTrigger>
              <SelectContent>
                {approvalStatusOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!!approvalStatus && (
              <button
                onClick={() => onApprovalStatusChange("")}
                className="absolute right-8 top-[12px] text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
