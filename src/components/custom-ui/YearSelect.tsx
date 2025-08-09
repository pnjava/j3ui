import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../components/ui/select";

interface YearSelectProps {
  value: string;
  onChange: (value: string) => void;
  pastYears?: number;
}

const YearSelect: React.FC<YearSelectProps> = ({ value, onChange, pastYears = 1 }) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: pastYears + 1 }, (_, i) => (currentYear - i).toString());

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        {yearOptions.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearSelect;
