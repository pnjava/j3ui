import { ChevronRight } from "lucide-react";
import { ElementType } from "react";

interface LinkPanelProps {
  title: string;
  iconColor: string;
  IconComponent: ElementType;
}

const LinkPanel = ({ title, IconComponent, iconColor = '' }: LinkPanelProps) => (
  <div className="flex grow min-w-[472px] p-4 bg-white rounded-lg border border-[#eeeeef] justify-start items-center gap-4">
    <div className={`w-12 h-12 p-2 ${iconColor} rounded-lg flex-col justify-center items-start gap-2 inline-flex`}>
      <div className="w-8 h-8 relative  overflow-hidden">
        <IconComponent color="white" className="w-full h-full" />
      </div>
    </div>
    <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
      <div className="self-stretch text-[#3b3e40] text-md font-semibold font-inter leading-normal">{title}</div>
    </div>
    <div className="w-6 h-6 relative  overflow-hidden">
      <ChevronRight className="w-full h-full" />
    </div>
  </div>
);

export default LinkPanel;
