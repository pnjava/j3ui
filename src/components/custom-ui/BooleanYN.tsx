import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { defaultButtonClasses } from "./Button";

interface BooleanYNProps {
  value?: boolean | null;
  name?: string;
  onChange?: (val: boolean | null) => void;
  className?: string;
  viewOnly?: boolean;
}

const BooleanYN = ({
  value,
  name,
  onChange: onChangeOpt,
  viewOnly,
}: BooleanYNProps) => {
  const [selectedOption, setSelectedOption] = useState<boolean | null>(
    value === undefined ? null : value
  );
  const onChange = onChangeOpt ? onChangeOpt : () => {};

  useEffect(() => {
    setSelectedOption(value === undefined ? null : value);
  }, [value]);

  function handleYesClick(e: React.MouseEvent) {
    e.preventDefault();
    if (!viewOnly) {
      setSelectedOption(true);
      onChange(true);
    }
  }

  function handleNoClick(e: React.MouseEvent) {
    e.preventDefault();
    if (!viewOnly) {
      setSelectedOption(false);
      onChange(false);
    }
  }

  const isYesSelected = selectedOption === true;
  const isNoSelected = selectedOption === false;

  return (
    <div id={name}>
      <Button
        onClick={handleYesClick}
        className={
          (isYesSelected ? defaultButtonClasses : "") + " mr-1 px-4 font-normal"
        }
        variant={isYesSelected ? "default" : "outline"}
        disabled={viewOnly}
      >
        Yes
      </Button>
      <Button
        onClick={handleNoClick}
        className={
          (isNoSelected ? defaultButtonClasses : "") + " ml-1 px-4 font-normal"
        }
        variant={isNoSelected ? "default" : "outline"}
        disabled={viewOnly}
      >
        No
      </Button>
    </div>
  );
};

export default BooleanYN;
