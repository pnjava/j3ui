import { ReactNode } from "react";
import PanelCard from "./PanelCard";
import { TriangleAlert } from "lucide-react";

interface PatientCardProps {
  name: string;
  mrn: string;
  statusBadge?: ReactNode;
  expirationDays?: number;
  planStatus: string;
  location: string;
}

const PatientCard = ({ name, mrn, statusBadge=null, planStatus, location, expirationDays }: PatientCardProps) => (
  <PanelCard titleCard={
    <>
      <div className="grow shrink basis-0 h-6 justify-start items-center gap-4 flex">
        <div className="text-[#3b3e40] text-base font-semibold font-inter leading-normal">{name}</div>
        <div className="text-[#53575a] text-sm font-normal font-inter leading-none">{mrn}</div>
      </div>
      { statusBadge }
    </>
  }>
    <div className="self-stretch text-[#53575a] text-sm font-normal font-inter leading-tight">{ planStatus }</div>
    <div className="self-stretch text-[#53575a] text-sm font-normal font-inter leading-tight">{ location }</div>

    { expirationDays && (
      <div className="px-2 py-1 bg-[#ffb0b0] rounded-3xl justify-center items-center gap-1 inline-flex">
        <TriangleAlert className="w-4 h-4 relative  overflow-hidden" color="#8c0000" />
        <div className="text-center text-[#8c0000] text-xs font-medium font-inter leading-none">Expires in {expirationDays} days</div>
      </div>
    )}

  </PanelCard>
);

export default PatientCard;
