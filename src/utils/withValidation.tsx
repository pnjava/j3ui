import React, { useState, forwardRef, useImperativeHandle } from "react";

interface ValidationProps {
  isRequiredField?: boolean;
  isIntegerField?: boolean;
  placeholder?: string;
  className?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  options?: { value: string | number; label: string }[];
}


const withValidation = (WrappedComponent: React.ComponentType<any>) => {
  const WithValidationComponent = forwardRef<any, ValidationProps>(
    ({ isRequiredField, isIntegerField, onChange, onBlur, ...props }, ref) => {
      const [error, setError] = useState<string | null>(null);
      const [value, setValue] = useState<any>("");

      useImperativeHandle(ref, () => ({
        validate: () => {

          if (isRequiredField && (!value || value === "")) {
            setError("This field is required.");
            return false;
          }

          if (isIntegerField && value && !/^\d+$/.test(value)) {
            setError("This field must be a valid integer.");
            return false;
          }

          setError(null);
          return true;
        },
      }));

      const handleChange = (e: any) => {
        let newValue;

        if (e?.target?.value !== undefined) {
          newValue = e.target.value;
        } else if (e !== undefined) {
          newValue = e;
        } else {
          newValue = "";
        }

        setValue(newValue);
        setError(null);
        if (onChange) onChange(e);
      };

      // Handle blur (losing focus)
      const handleBlur = (e: any) => {
        if (isRequiredField && (!value || value === "")) {
          setError("This field is required.");
        } else if (isIntegerField && value && !/^\d+$/.test(value)) {
          setError("This field must be a valid integer.");
        }

        if (onBlur) onBlur(e);
      };

      return (
        <div className="validation-wrapper">
          <WrappedComponent
            {...props}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    }
  );

  return WithValidationComponent;
};

export default withValidation;
