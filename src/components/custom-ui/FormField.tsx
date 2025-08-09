/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "../../lib/utils";
import BooleanYN from "./BooleanYN";
import { FieldError, FieldErrorsImpl, Merge, useFormContext, useWatch } from "react-hook-form";
import InformationNeeded from "./InformationNeeded";
import { CalculationContext } from "../../context/CalculationContext";
import { Checkbox } from "../ui/checkbox";

type FieldOption = {
  rates?: RateOption;
  label: string;
  value: string;
};

type RateOption = {
  baseRate?: number | string;
  cap?: number | string;
  northern?: number | string;
  all_others?: number | string;
};

type LayoutOption = {
  cols?: number;
  offset?: number;
  justifySelf?: "start" | "center" | "end";
  data?: string;
};

interface DependsOnOption {
  fieldName: string;
  value: string | string[] | boolean;
}

export interface FormFieldDefinition {
  section?: string;
  fieldId: string;
  name: string;
  type: string;
  label: string;
  required?: boolean;
  subSection?: string;
  fieldConfig?: {
    validations?: Record<string, unknown>[];
    options?: FieldOption[];
    layoutOptions?: LayoutOption;
    dependsOn?: DependsOnOption[];
    helpText?: string;
    placeholder?: string;
    data?: string;
  };
}

interface FormFieldProps {
  field: FormFieldDefinition;
  value?: any;
  formValues?: Record<string, any>;
  onChange?: (newVal: any) => void;
  onBlur?: (e: any) => void;
  viewOnly?: boolean;
  /** any validation error for this field */
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | string;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value = "",
  onChange,
  onBlur,
  viewOnly,
  error
}) => {
  const { fieldId, name, type, label, required, fieldConfig } = field;

  const {
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const formData = getValues();
  const { setValue: setCalcValue } = useContext(CalculationContext);

  const dependencyFieldNames =
    fieldConfig?.dependsOn?.map((dep) => dep.fieldName) || [];
  const dependencyValues = useWatch({ name: dependencyFieldNames });
  const facilityLocationCsbRegionField = useWatch({
    name: "facilityLocationCsbRegion",
  });
  const dependentBehaviorPatternSelections = [
    " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
    " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more",
  ];

  const shouldShow = () => {
    if (!fieldConfig?.dependsOn || fieldConfig.dependsOn.length === 0)
      return true;

    return fieldConfig.dependsOn.every(({ fieldName, value }) => {
      const currentValue = formData[fieldName];
      // If dependency value is an array, check if currentValue is included in it.
      if (Array.isArray(value)) {
        return value.includes(currentValue);
      }
      // Otherwise, check equality directly.
      return currentValue === value;
    });
  };

  const handleBasicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange?.(e.target.value);
  };
  const handleSelectChange = (val: string) => {
    onChange?.(val);
  };
  const handleSwitchChange = (checked: boolean) => {
    onChange?.(checked);
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  const cols = fieldConfig?.layoutOptions?.cols;
  const startColumn = (fieldConfig?.layoutOptions?.offset || 0) + 1;
  const endColumn = startColumn + (fieldConfig?.layoutOptions?.cols || 12);
  const justifySelf = fieldConfig?.layoutOptions?.justifySelf;

  // Extract the error for this field
  const fieldError = errors[name]?.message;

  const getOptionCost = (option: FieldOption): number | null => {
    if (option.rates) {
      if (option.rates.baseRate !== undefined)
        return Number(option.rates.baseRate);
      if (option.rates.cap !== undefined) return Number(option.rates.cap);
      if (
        facilityLocationCsbRegionField === "All Other Regions" &&
        option.rates.all_others
      ) {
        return Number(option.rates.all_others);
      }
      if (
        facilityLocationCsbRegionField === "Northern VA" &&
        option.rates.northern
      ) {
        return Number(option.rates.northern);
      }
      const keys = Object.keys(option.rates);
      if (keys.length > 0 && option.rates[keys[0]] !== undefined) {
        return option.rates[keys[0]] as number;
      }
    }
    return null;
  };

  let infoValue: number | null = null;
  if (fieldConfig?.options) {
    if (type === "selectInfoNeeded" || type === "selectInfoNeededWithInput") {
      const selectedOption = fieldConfig.options.find(
        (opt) => opt.value === value
      );
      if (selectedOption) {
        const labelLower = selectedOption.label.toLowerCase();
        // If the label contains "not applicable" or "no assistance needed", mark it with -1.
        if (
          labelLower.includes("not applicable") ||
          labelLower.includes("no assistance needed")
        ) {
          infoValue = 0;
        } else {
          infoValue = getOptionCost(selectedOption);
        }
      }
    } else if (type === "selectBehaviorScore") {
      if (typeof value === "string") {
        const trimmed = value.trim();
        if (trimmed === "No Support Needed") {
          infoValue = 0;
        } else if (trimmed === "Some Support Needed") {
          infoValue = 1;
        } else if (trimmed === "Extensive Support Needed") {
          infoValue = 2;
        }
      }
    }
  }

  useEffect(() => {
    if (
      type === "selectInfoNeeded" ||
      type === "selectInfoNeededWithInput" ||
      type === "selectBehaviorScore"
    ) {
      setValue(`${name}_cost`, infoValue);
    }
  }, [infoValue, name, setValue, type]);

  useEffect(() => {
    if (infoValue != null) {
      setCalcValue(field.name, infoValue);
    } else {
      setCalcValue(field.name, 0);
    }
  }, [infoValue, field.name, setCalcValue]);

  return (
    <div
      style={{
        transitionBehavior: "allow-discrete",
      }}
      className={cn(
        "flex flex-col transition-opacity duration-150 ease-in-out",
        `col-span-${cols || 6}`,
        justifySelf && `justify-self-${justifySelf}`,
        startColumn && `col-start-${startColumn} col-end-${endColumn}`,
        {
          "opacity-0 pointer-events-none -z-10": !shouldShow(),
          "opacity-100 pointer-events-auto z-auto": shouldShow(),
        }
      )}
    >
      <Label
        className="text-slate-900 text-sm font-medium font-inter leading-tight"
        htmlFor={name}
      >
        {" "}
        {((name === "plan_end_date" && formData.typeOfFunds === "ONE_TIME") || required) && (
          <span className="text-red-600 ml-1">*</span>
        )} {label}
      </Label>
      {type === "select" && fieldConfig?.options && (
        <div>
          <Select
            onValueChange={handleSelectChange}
            value={value}
          >
            <SelectTrigger
              id={name}
              className={cn({ "border-red-500": fieldError })}
              onBlur={onBlur}
              disabled={viewOnly}
            >
              <SelectValue
                placeholder={fieldConfig.placeholder || "Select option"}
              />
            </SelectTrigger>
            <SelectContent>
              {fieldConfig.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError && (
            <span className="text-red-600 text-sm mt-1">
              {String(fieldError)}
            </span>
          )}
        </div>
      )}
      {name === "behaviorPattern" &&
        dependentBehaviorPatternSelections.includes(value) && (
          <div className="mt-4 pr-12">
            <h4 className="text-[#3b3e40] text-base font-semibold font-inter">
              Behavioral Intervention Form
            </h4>
            <p className="text-[#53575a] text-sm font-normal font-inter leading-tight">
              Consider each description then please choose the appropriate level
              of care needed. For individuals in the community consider the last
              30 days. Once all fields are completed the total score will be
              generated in the Description of behaviors field at the bottom of
              the Behaviors section. For more information please see the&nbsp;
              <a
                className="text-[#00689a] text-sm font-normal font-inter underline leading-tight visited:text-[#00689a]"
                href="#definitions-for-levels-of-care"
              >
                Definitions for the levels of care
              </a>
              .
            </p>
          </div>
        )}
      {(type === "string" || type === "text") && (
        <div>
          <Input
            id={name}
            required={!!required}
            value={value}
            onChange={handleBasicChange}
            className={cn({ "border-red-500": fieldError })}
            aria-invalid={!!fieldError}
            placeholder={fieldConfig?.placeholder || undefined}
            disabled={viewOnly}
            onBlur={onBlur}
          />
          {fieldError && (
            <span className="text-red-600 text-sm mt-1">{fieldError.toString()}</span>
          )}
        </div>
      )}
      {type === "checkbox" && (
        <div>
          <div className="flex items-center">
            <Checkbox
              id={name}
              checked={Boolean(value)}
              onCheckedChange={handleSwitchChange}
              className={cn("h-4 w-4", { "border-red-500": fieldError })}
              disabled={viewOnly}
              onBlur={onBlur}
            />
            {/* {field.name === "forProgrammaticOversightCheckbox1" && (
              <Label htmlFor={field.name}>{field.label}</Label>
            )}
            <p className="text-sm text-muted-foreground">
              {field.fieldConfig.layoutOptions.data}
            </p> */}
          </div>
          {fieldError && (
            <span className="text-red-600 text-sm absolute mt-6 ml-8">{fieldError.toString()}</span>
          )}
        </div>
      )}
      {type === "textarea" && (
        <div>
          <Textarea
            id={name}
            required={!!required}
            value={value}
            onChange={handleBasicChange}
            className={cn({ "border-red-500": fieldError })}
            aria-invalid={!!fieldError}
            disabled={viewOnly}
            placeholder={fieldConfig?.placeholder || undefined}
            onBlur={onBlur}
          />
          {fieldError && (
            <span className="text-red-600 text-sm mt-1">
              {String(fieldError)} <br />
            </span>
          )}
          {fieldConfig?.helpText && (
            <span className="ml-auto text-sm text-muted-foreground">
              {fieldConfig.helpText}
            </span>
          )}
        </div>
      )}
      {type === "date" && (
        <div>
          <Input
            id={name}
            type="date"
            required={!!required}
            value={value}
            disabled={viewOnly}
            onChange={handleBasicChange}
            className={cn({ "border-red-500": fieldError })}
            aria-invalid={!!fieldError}
            onBlur={onBlur}
          />
          {fieldError && (
            <span className="text-red-600 text-sm mt-1">{fieldError.toString()}</span>
          )}
        </div>
      )}
      {type === "yes_no" && (
        <div>
          <div className="flex items-center gap-2">
            <BooleanYN
              value={value}
              name={name}
              onChange={handleSwitchChange}
              // Pass error state if needed
              className={cn({ "border-red-500": fieldError })}
              viewOnly={viewOnly}
            />
          </div>
          {fieldError && (
            <span className="text-red-600 text-sm mt-1">{fieldError.toString()}</span>
          )}
        </div>
      )}
      {type === "amount" && (
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-muted-foreground text-slate-400">$</span>
            </div>
            <Input
              value={Number(value) || undefined}
              placeholder={fieldConfig?.placeholder || "Enter amount"}
              type="number"
              step={1}
              className={cn("pl-8", { "border-red-500": fieldError })}
              onChange={handleAmountChange}
              id={name}
              aria-invalid={!!fieldError}
              disabled={viewOnly}
              onBlur={onBlur}
            />
          </div>
          {fieldError && (
            <span className="text-red-600 text-sm mt-1">{fieldError.toString()}</span>
          )}
        </div>
      )}
      {type === "number" && (
        <div>
          <div className="relative">
            <Input
              value={Number(value) || undefined}
              placeholder={fieldConfig?.placeholder || "Enter amount"}
              type="number"
              step={1}
              className={cn({ "border-red-500": fieldError })}
              onChange={handleAmountChange}
              id={name}
              aria-invalid={!!fieldError}
              disabled={viewOnly}
              onBlur={onBlur}
            />
          </div>
          {fieldError && (
            <span className="text-red-600 text-sm mt-1">{fieldError.toString()}</span>
          )}
        </div>
      )}
      {type === "selectInfoNeeded" && fieldConfig?.options && (
        <>
          <div className="grid grid-cols-4">
            <div className="col-span-3 mr-4">
              <Select
                onValueChange={handleSelectChange}
                value={value}
                disabled={viewOnly || name.trim() === "descriptionOfBehaviors"}
              >
                <SelectTrigger
                  id={name}
                  className={cn({ "border-red-500": fieldError })}
                  onBlur={onBlur}
                >
                  <SelectValue
                    placeholder={fieldConfig.placeholder || "Select option"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {fieldConfig.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldError && (
                <span className="text-red-600 text-sm mt-1">
                  {String(fieldError)}
                </span>
              )}{" "}
            </div>
            <div className="">
              <InformationNeeded value={infoValue} />
            </div>
          </div>
        </>
      )}
      {type === "selectBehaviorScore" && fieldConfig?.options && (
        <>
          <div className="grid grid-cols-4">
            <div className="col-span-3 mr-4">
              <Select
                onValueChange={handleSelectChange}
                value={value}
                disabled={viewOnly}
              >
                <SelectTrigger
                  id={name}
                  className={cn({ "border-red-500": fieldError })}
                  onBlur={onBlur}
                >
                  <SelectValue
                    placeholder={fieldConfig.placeholder || "Select option"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {fieldConfig.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldError && (
                <span className="text-red-600 text-sm mt-1">
                  {String(fieldError)}
                </span>
              )}{" "}
            </div>
            <div className="">
              <InformationNeeded
                isBehavioral
                value={
                  typeof value === "string"
                    ? value.trim() === "No Support Needed"
                      ? 0
                      : value.trim() === "Some Support Needed"
                      ? 1
                      : value.trim() === "Extensive Support Needed"
                      ? 2
                      : infoValue
                    : infoValue
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
