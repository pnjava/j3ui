import { ReactNode } from "react";

interface PanelCardProps {
  titleCard: ReactNode; 
  children: ReactNode;
}

const PanelCard = ({ titleCard, children }: PanelCardProps) => (
  <div className="min-w-[298px] grow shrink basis-0 p-4 bg-white rounded-lg border border-[#cacbcc] flex-col justify-center items-start gap-4 inline-flex">
    <div className="self-stretch flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch justify-start items-center gap-6 inline-flex">
          { titleCard }
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-1 flex">
          { children }
        </div>
    </div>
  </div>
);

export default PanelCard;
