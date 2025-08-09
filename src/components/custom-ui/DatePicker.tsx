// DatePicker component with year selector. To disable future date pick add disableFutureDates={true} prop

"use client";

import * as React from "react";
import {
  format,
  isValid,
  parse,
  setYear,
  getYear,
  startOfYear,
  getMonth,
  isAfter,
} from "date-fns";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export const DatePicker = React.forwardRef(
  (
    {
      value,
      onChange,
      disableFutureDates = false,
      disabled = false,
    }: {
      value?: Date | string;
      onChange?: (date: Date | null) => void;
      disableFutureDates?: boolean;
      disabled?: boolean;
    },
    ref
  ) => {
    const dateFormat = "yyyy-MM-dd";

    let initialValue: Date | null = null;
    if (value) {
      initialValue =
        typeof value === "string"
          ? parse(value, dateFormat, new Date())
          : value;
    }

    React.useImperativeHandle(ref, () => ({
      reset: () => setDate(null),
    }));

    const [date, setDate] = React.useState<Date | null>(
      isValid(initialValue) ? initialValue : null
    );
    const [year, setYearState] = React.useState<number>(
      date ? getYear(date) : new Date().getFullYear()
    );
    const [month, setMonthState] = React.useState<number>(
      date ? getMonth(date) : new Date().getMonth()
    );

    const handleDateChange = (selectedDate: Date | null) => {
      if (selectedDate) {
        if (disableFutureDates && isAfter(selectedDate, new Date())) {
          return;
        }
        const updatedDate = setYear(selectedDate, year);
        setDate(updatedDate);
        if (onChange) onChange(updatedDate);
      } else {
        setDate(null);
        if (onChange) onChange(null);
      }
    };

    const handleYearChange = (newYear: number) => {
      setYearState(newYear);
      const updatedDate = startOfYear(new Date(newYear, month, 1)); // Maintain month but switch to first day
      if (disableFutureDates && isAfter(updatedDate, new Date())) {
        return;
      }
      setDate(updatedDate);
      if (onChange) onChange(updatedDate);
    };

    return (
      <Popover>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date ? (
              format(date, dateFormat)
            ) : (
              <span className="text-slate-400">YYYY-MM-DD</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3 flex flex-col gap-2">
          <Select
            value={year.toString()}
            onValueChange={(val) => handleYearChange(Number(val))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 100 }, (_, i) => {
                const optionYear = new Date().getFullYear() - i;
                if (
                  disableFutureDates &&
                  optionYear > new Date().getFullYear()
                ) {
                  return null;
                }
                return (
                  <SelectItem key={i} value={optionYear.toString()}>
                    {optionYear}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
            month={new Date(year, month, 1)}
            onMonthChange={(newMonth) => setMonthState(newMonth.getMonth())}
            disabled={(day) => disableFutureDates && isAfter(day, new Date())}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
