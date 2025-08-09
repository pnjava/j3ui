import { UseFormReturn } from "react-hook-form";
import { PatientFormStep, Step, StepLabelDict } from "../../lib/types";
import { Dispatch, SetStateAction } from "react";

export const patientFormStepper: StepLabelDict = {
  [PatientFormStep.MEMORY_CARE]: "Memory Care Justification",
  [PatientFormStep.CATCHMENT_PLAN]: "Catchment Plan",
  [PatientFormStep.DAP_RESIDENTIAL_RATE]: "DAP Residential Rate",
  [PatientFormStep.DISCHARGE_BARRIERS]: "Discharge Barriers",
  [PatientFormStep.DISCHARGE_REQUEST]: "Discharge Request",
  [PatientFormStep.PATIENT_RESOURCES]: "Patient Resources",
  [PatientFormStep.TABLE_OF_COST]: "Table of Cost",
  [PatientFormStep.OVERVIEW]: "Patient Details",
  [PatientFormStep.CUSTOM_RATE_PLAN]: "Custom Rate Application",
};

export const findStepForField = (
  fundingRequestConfig: {
    sections: { sectionId: string; fields: { name: string }[] }[];
  },
  fieldName: string
): Step => {
  for (const section of fundingRequestConfig.sections) {
    for (const field of section.fields) {
      if (field.name === fieldName) {
        return section.sectionId as Step;
      }
    }
  }
  return PatientFormStep.DISCHARGE_REQUEST;
};

export const validateAndScroll = async (
  formMethods: UseFormReturn<any>,
  stepSetter: Dispatch<SetStateAction<PatientFormStep>>,
  fundingRequestConfig: any
): Promise<boolean> => {
  const {
    trigger,
    formState: { errors },
  } = formMethods;

  const valid = await trigger();
  if (!valid) {
    const errorFields = Object.keys(errors);
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0];
      const stepToSet = findStepForField(fundingRequestConfig, firstErrorField);
      stepSetter(stepToSet);
      setTimeout(() => {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
    }
    return false;
  }
  return true;
};
