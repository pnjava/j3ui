import { Info } from "lucide-react";
import { Button } from "../../ui/button";

interface BasePanelProps {
  title: string;
  children: React.ReactNode;
}

const BasePanel = ({ title, children }: BasePanelProps) => (
  <div className="p-4 bg-white rounded-lg border border-[#eeeeef] flex-col justify-start items-start gap-4 inline-flex">
      <div className="self-stretch h-11 flex-col justify-start items-start gap-3 flex">
          <div className="self-stretch justify-start items-center inline-flex">
              <div className="grow shrink basis-0 h-6 justify-start items-center gap-1 flex">
                  <div className="text-[#3b3e40] text-lg font-semibold font-inter leading-normal">{title}</div>
                  <div className="p-1 bg-white rounded justify-start items-center gap-2 flex">
                    <Info color="#00689A" className="w-4 h-4 relative  overflow-hidden" />
                  </div>
              </div>

              <Button
                variant="outline"
                className="px-6 h-8 border-[#00689a] gap-2"
              >
                  <div className="text-[#00689a] text-xs font-medium font-inter leading-none">View all</div>
              </Button>

          </div>
          <div className="self-stretch h-[0px] border border-[#eeeeef]"></div>
      </div>
      { children }
  </div>
);

export default BasePanel;
