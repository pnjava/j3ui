import * as React from "react";

import { Input } from "../ui/input";
import { useEffect, useState } from "react";

const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, placeholder = "Enter Amount", ...props }, ref) => {
  const [currency, setCurrency] = useState(0);

  useEffect(() => {
    if (props?.value) {
      const initialCurrency = Number(props.value);
      setCurrency(initialCurrency);
    }
  }, [props?.value]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <span className="text-muted-foreground text-slate-400">$</span>
      </div>
      <Input
        {...props}
        value={currency}
        placeholder={placeholder}
        type="number"
        min={0}
        step={1}
        className="pl-8"
        ref={ref}
        onChange={(e) => {
          setCurrency(Number(e.target.value));
        }}
      />
    </div>
  );
});
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
