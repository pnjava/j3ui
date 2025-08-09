import { DollarSign } from "lucide-react";

interface InformationNeededProps {
  value?: number | null;
  isBehavioral?: boolean;
}

const InformationNeeded = ({
  value,
  isBehavioral = false,
}: InformationNeededProps) => {
  let displayText = "Information needed";

  if (typeof value === "number" && isFinite(value)) {
    if (isBehavioral && value === 0) {
      displayText = "—";
    } else {
      displayText = new Intl.NumberFormat("en-US").format(value);
    }
  } else if (isBehavioral) {
    displayText = "Score";
  }

  return (
    <div className="h-10 px-4 w-full bg-neutral-100 rounded-md justify-start items-center gap-2 inline-flex">
      {!isBehavioral && (
        <DollarSign className="w-4 h-4 relative overflow-hidden" />
      )}
      <div className="grow shrink basis-0 text-[#53575a] text-base font-normal font-inter leading-normal">
        {displayText}
      </div>
    </div>
  );
};

export default InformationNeeded;
