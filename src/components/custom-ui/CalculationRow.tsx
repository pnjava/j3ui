import { useContext, useState } from "react";
import { Input } from "../ui/input";
import InformationNeeded from "./InformationNeeded";
import Label from "./Label";
import { CalculationContext } from "../../context/CalculationContext";
import { DropdownOption } from "../../lib/types";
import Dropdown from "./Dropdown";

interface CalculationRowProps {
  inputType: string;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  options?: DropdownOption[];
  name: string;
}

const CalculationRow = ({ name, inputType, options, label, placeholder, isRequired = false }: CalculationRowProps) => {
  const { setValue: setCalculationValue } = useContext(CalculationContext);
  const [value, setValue] = useState<number | null | undefined>();

  return (
    <div className="grid grid-cols-4 mb-8">
      <div className="col-span-3">
        <Label isRequired={isRequired}> {label}</Label>
        { inputType === "number" && <Input type="number" placeholder={placeholder} className="flex-1" 
          onChange={(e)=> {
            const val = parseFloat(e.target.value);
            setValue(val);
            setCalculationValue(name, val);
          }} /> }
          { inputType === "dropdown" && 
            <Dropdown options={options || []} 
              onChange={(val) => {
                const option = options?.find((({value}) => value === val))
                setValue(option?.cost);
                setCalculationValue(name, option?.cost);
              }} /> }
      </div>
      <div className="mt-5">
        <InformationNeeded value={value} />
      </div>
    </div>
  );
};

export default CalculationRow;
