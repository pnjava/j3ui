import React from "react";
import { Label as ShadCNLabel } from "../ui/label";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean
  children: React.ReactNode
}

const Label: React.FC<LabelProps> = ({
  isRequired = false,
  children,
  ...props }) => (
    <ShadCNLabel {...props}>
      { isRequired && <span className="text-red-500">*</span> }
      {children}
    </ShadCNLabel>
  );

export default Label;
