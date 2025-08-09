import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../components/ui/select";

interface FiscalYearSelectProps {
  value: string;
  onChange: (value: string) => void;
  pastYears?: number;
}

const FiscalYearSelect: React.FC<FiscalYearSelectProps> = ({ value, onChange, pastYears = 1 }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const isAfterJuly = today.getMonth() >= 6;
  const defaultFiscalYear = isAfterJuly ? currentYear + 1 : currentYear;

  const fiscalYearOptions = Array.from({ length: pastYears + 1 }, (_, i) => {
    const fy = defaultFiscalYear - i;
    return { label: `FY${fy.toString().slice(-2)}`, value: fy.toString() };
  });

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select Fiscal Year" />
      </SelectTrigger>
      <SelectContent>
        {fiscalYearOptions.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FiscalYearSelect;
