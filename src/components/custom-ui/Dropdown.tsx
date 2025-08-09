import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DropdownOption, DropdownValue } from "../../lib/types";
import { useState } from "react";

interface DropdownProps { 
  value?: DropdownValue;
  options: DropdownOption[];
  placeholder?: string;
  onChange?: (val: DropdownValue) => void;
}

const Dropdown = ({ value, options, placeholder = 'Select option', onChange }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<DropdownValue | undefined>(value);

  return (
    <Select
      value={String(selectedOption)}
      onValueChange={(value: DropdownValue) => {
        setSelectedOption(value);
        if (onChange) onChange(value);
      }}
    >
      <SelectTrigger className="w-full font-bold">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        { options.map(({ label, value }) => (<SelectItem key={value} value={String(value)}>{label}</SelectItem>)) }
      </SelectContent>
    </Select>
  );
}

export default Dropdown;
