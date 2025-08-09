import React from "react";

interface FormRowProps {
  children: React.ReactNode;
}

export function FormRow({ children }: FormRowProps) {
  return (
    <div
      className="form-row grid grid-cols-12 gap-8 mb-8"
    >
      {children}
    </div>
  );
}
