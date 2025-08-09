export enum PatientFormStep {
  OVERVIEW = "OVERVIEW",
  DISCHARGE_REQUEST = "DISCHARGE_REQUEST",
  MEMORY_CARE = "MEMORY_CARE",
  CATCHMENT_PLAN = "CATCHMENT_PLAN",
  DAP_RESIDENTIAL_RATE = "DAP_RESIDENTIAL_RATE",
  DISCHARGE_BARRIERS = "DISCHARGE_BARRIERS",
  PATIENT_RESOURCES = "PATIENT_RESOURCES",
  TABLE_OF_COST = "TABLE_OF_COST",
  CUSTOM_RATE_PLAN = "CUSTOM_RATE_PLAN",
}

export type Step = PatientFormStep;
export type StepLabelDict = Record<Step, string>;
export type StepWithRequiredFields = { id: Step; requiredFields: string[] };
