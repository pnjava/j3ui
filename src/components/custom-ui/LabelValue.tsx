import { Label } from "../ui/label";

const LabelValue = ({ placeholder, value }: { placeholder: string, value: string }) => (
  <>
    <Label className="text-[#3b3e40] text-sm font-inter font-medium leading-tight">{placeholder}</Label>
    <div className="bg-neutral-100 font-normal text-base text-slate-900 font-inter rounded-md px-4 py-2 min-h-[40px]">
      {value}
    </div>
  </>
);

export default LabelValue;
