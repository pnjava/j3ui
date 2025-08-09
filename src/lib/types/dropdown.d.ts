export interface DropdownOption {
  label: string;
  value: DropdownValue;
  cost?: number;
  programs?: string[];
}

export type DropdownValue = string | number;
