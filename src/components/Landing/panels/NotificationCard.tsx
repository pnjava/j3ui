import { CalendarDays } from "lucide-react";
import { ElementType, ReactNode } from "react";

interface NotificationCardProps {
  title: string;
  date: string;
  children: ReactNode;
  iconColor: string;
  IconComponent: ElementType;
}

const NotificationCard = ({ title, date, children, iconColor, IconComponent }: NotificationCardProps) => (
  <div className="self-stretch py-4 border-b border-[#eeeeef] justify-start items-start gap-4 inline-flex">
    <div className={`p-1 ${iconColor} rounded justify-start items-center flex`}>
      <IconComponent className="w-4 h-4 relative  overflow-hidden" />
    </div>
    <div className="w-[536px] flex-col justify-start items-start gap-2 inline-flex">
        <div className="self-stretch h-[46px] flex-col justify-start items-start gap-0.5 flex">
            <div className="self-stretch justify-start items-start gap-6 inline-flex">
                <div className="text-[#3b3e40] text-base font-semibold font-inter leading-normal">{title}</div>
                <div className="justify-start items-center gap-1 flex">
                    <CalendarDays className="w-4 h-4 relative  overflow-hidden" />
                    <div className="text-[#8c8e90] text-sm font-normal font-inter leading-normal">{date}</div>
                </div>
            </div>
            <div className="self-stretch grow shrink basis-0 text-slate-600 text-sm font-normal font-inter leading-tight">{children}</div>
        </div>
    </div>
  </div>
);

export default NotificationCard;
