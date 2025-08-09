import { DropdownOption } from "../../lib/types";

export const dcReadinessLevelOptions: DropdownOption[] = [
  { label: "1", value: "1"},
  { label: "2", value: "2"},
  { label: "3", value: "3"},
  { label: "4", value: "4"},
];

export const typesOfFundsOptions: DropdownOption[] = [
  { label: "One Time", value: "One Time"},
  { label: "Ongoing", value: "Ongoing"},
  { label: "Both", value: "Both"},
];

export const waiverStatusOptions: DropdownOption[] = [
  { label: "Not Waiver Eligible", value: "Not Waiver Eligible"},
  { label: "On Waitlist", value: "On Waitlist"},
  { label: "Will be Referred", value: "Will be Referred"},
  { label: "Has Waiver", value: "Has Waiver"},
  { label: "N/A", value: "N/A"},
];

export const insuranceOptions: DropdownOption[] = [
  { label: "Medicaid", value: "Medicaid"},
  { label: "Medicare", value: "Medicare"},
  { label: "Not Applicable", value: "Not Applicable"},
  { label: "VA Benefits", value: "VA Benefits"},
];

export const faciltyLocationCSBOptions: DropdownOption[] = [
  { label: "Northern VA", value: "Northern VA", cost:  2391 },
  { label: "All other regions", value: "All other regions", cost:  2079 },
];

export const potentialPlacementFacilityTypeOptions: DropdownOption[] = [
  { label: "Assisted Living/ Group Home", value: "Assisted Living/ Group Home"},
  { label: "Memory Care", value: "Memory Care"},
  { label: "Nursing Facility", value: "Nursing Facility"},
  { label: "Assisted Living/Group Home- Northern", value: "Assisted Living/Group Home- Northern"},
  { label: "Memory Care- Northern", value: "Memory Care- Northern"},
  { label: "Nursing Facility- Northern", value: "Nursing Facility- Northern"},
];

export const ambulationFunctionalStatusOptions: DropdownOption[] = [
  { label: "Ambulation - no assistance needed or supervision only", value: "Ambulation - no assistance needed or supervision only", cost: 0 },
  { label: "Ambulation - physical assistance needed", value: "Ambulation - physical assistance needed", cost:  545 }, 
];

export const continenceOptions: DropdownOption[] = [
  { label: "Continence - no assistance needed or supervision only", value: "Continence - no assistance needed or supervision only", cost: 0 },
  { label: "Continence - not self care/needs help", value: "Continence - not self care/needs help", cost:  545 }
];

export const eatingAndFeedingFunctionalStatusOptions: DropdownOption[] = [
  { label: "Eating/Feeding - no assistance needed, supervision only or minimal assistance", value: "Eating/Feeding - no assistance needed, supervision only or minimal assistance", cost: 0 },
  { label: "Eating/Feeding - \"Performed by others\"", value: "Eating/Feeding - \"Performed by others\"", cost:  1226 },
];

export const bathingDressingAndTransfersFunctionalStatusOptions: DropdownOption[] = [
  { label: "Bathing, dressing, transfers - no assistance needed, supervision only or minimal assistance", value: "Bathing, dressing, transfers - no assistance needed, supervision only or minimal assistance", cost: 0 },
  { label: " Bathing, dressing, transfers - \"Performed by others\"", value: " Bathing, dressing, transfers - \"Performed by others\"", cost:  1226 },
];

export const physicalHealthAssessmentDiagnosesAndMedicationProfileOptions: DropdownOption[] = [
  { label: "Not applicable - no health conditions", value: "Not applicable - no health conditions" },
  { label: "Cancer (03)", value: "Cancer (03)" },
  { label: "Dementia (08,09)", value: "Dementia (08,09)" },
  { label: "Developmental Disabilities (10-17)", value: "Developmental Disabilities (10-17)" },
  { label: "Diabetes (19) or renal failure (40)", value: "Diabetes (19) or renal failure (40)" },
  { label: "Immune System Disorders / HIV (22)", value: "Immune System Disorders / HIV (22)" },
  { label: "Psychiatric Disorders (30-35)", value: "Psychiatric Disorders (30-35)" },
  { label: "Neurological Problems Brain Trauma/Injury (26-29)", value: "Neurological Problems Brain Trauma/Injury (26-29)" },
];

export const physicalHealthAssessment1: DropdownOption[] = [
  { label: "Not applicable - no health conditions", value: "Not applicable - no health conditions", cost: 0 },
  { label: "Cancer (03)", value: "Cancer (03)", cost:  545 },
  { label: "Dementia (08,09)", value: "Dementia (08,09)", cost: 409 },
  { label: "Diabetes (19) or renal failure (40)", value: "Diabetes (19) or renal failure (40)", cost: 409 },
  { label: "Immune System Disorders / HIV (22)", value: "Immune System Disorders / HIV (22)", cost: 409 },
  { label: "Psychiatric Disorders (30-35)", value: "Psychiatric Disorders (30-35)", cost: 409 },
  { label: "Neurological Problems Brain Trauma/Injury (26-29)", value: "Neurological Problems Brain Trauma/Injury (26-29)", cost: 1521 },
];

export const diagnosesMedicationProfile2: DropdownOption[] = [
  { label: "Not applicable - no health conditions", value: "Not applicable - no health conditions", cost: 0 },
  { label: "Cancer (03)", value: "Cancer (03)", cost:  545 },
  { label: "Dementia (08,09)", value: "Dementia (08,09)", cost: 409 },
  { label: "Diabetes (19) or renal failure (40)", value: "Diabetes (19) or renal failure (40)", cost: 409 },
  { label: "Immune System Disorders / HIV (22)", value: "Immune System Disorders / HIV (22)", cost: 409 },
  { label: "Psychiatric Disorders (30-35)", value: "Psychiatric Disorders (30-35)", cost: 409 },
];

export const diagnosesMedicationProfile3: DropdownOption[] = [
  { label: "Not applicable - no health conditions", value: "Not applicable - no health conditions", cost: 0 },
  { label: "Cancer (03)", value: "Cancer (03)", cost:  545 },
  { label: "Dementia (08,09)", value: "Dementia (08,09)", cost: 409 },
  { label: "Immune System Disorders / HIV (22)", value: "Immune System Disorders / HIV (22)", cost: 409 },
  { label: "Psychiatric Disorders (30-35)", value: "Psychiatric Disorders (30-35)", cost: 409 },
];

export const sensoryFunctionsOptions: DropdownOption[] = [
  { label: "Sensory functions - Normal", value: "Sensory functions - Normal", cost: 0 },
  { label: "Sensory functions - Impairment", value: "Sensory functions - Impairment", cost: 0 },
  { label: "Sensory functions - Complete Loss (any one)", value: "Sensory functions - Complete Loss (any one)", cost: 817 },
];

export const behaviorPatternOptions: DropdownOption[] = [
  { label: "Behavior pattern - Appropriate", value: "Behavior pattern - Appropriate" },
  { label: "Behavior pattern - Wandering / Passive - Less than weekly", value: "Behavior pattern - Wandering / Passive - Less than weekly" }, 
  { label: "Behavior pattern - Wandering / Passive - Weekly or more", value: "Behavior pattern - Wandering / Passive - Weekly or more" },
  { label: "Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly", value: "Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly" },
  { label: "Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more", value: "Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more" }
];

export const dapBehavioralAssessmentFormOptions: DropdownOption[] = [
  { value: "Disruptive - Behavioral supplement score 1-3", label: "Disruptive - Behavioral supplement score 1-3", cost: 272 },
  { value: "Disruptive - Behavioral supplement score 4-6", label: "Disruptive - Behavioral supplement score 4-6", cost: 409 },
  { value: "Disruptive - Behavioral supplement score 7-9", label: "Disruptive - Behavioral supplement score 7-9", cost: 545 },
  { value: "Disruptive - Behavioral supplement score 10-12", label: "Disruptive - Behavioral supplement score 10-12", cost: 1090 },
  { value: "Disruptive - Behavioral supplement score 13-15", label: "Disruptive - Behavioral supplement score 13-15", cost: 1636 },
  { value: "Disruptive - Behavioral supplement score 16-20", label: "Disruptive - Behavioral supplement score 16-20", cost: 2181 },
  { value: "Disruptive -  Behavioral Supplement Score 21-24 daily staff log required", label: "Disruptive -  Behavioral Supplement Score 21-24 daily staff log required", cost:  4906 },
];

export const ngriOptions: DropdownOption[] = [
  { value: "NGRI - not applicable", label: "NGRI - not applicable", cost: 0 },
  { value: "NGRI - non-violent offence", label: "NGRI - non-violent offence", cost: 500 },
  { value: "NGRI - violent offence", label: "NGRI - violent offence", cost: 1000 },
];

export const registeredSexOffenderOptions: DropdownOption[] = [
  { value: "Registered sex offender - not applicable", label: "Registered sex offender - not applicable", cost: 0 },
  { value: "Registered sex offender - non-violent", label: "Registered sex offender - non-violent", cost: 750 },
  { value: "Registered sex offender - violent", label: "Registered sex offender - violent", cost: 1000 },
];

export const arsonOptions: DropdownOption[] = [
  { value: "Arson - not applicable ", label: "Arson - not applicable", cost: 0 },
  { value: "Arson", label: "Arson", cost: 1000 },
];

export const impedingHospitalDischargeOptions: DropdownOption[] = [
  { value: "No legal decision maker currently in place", label: "No legal decision maker currently in place", cost: 1000 },
  { value: "Not applicable", label: "Not applicable", cost: 1000 },
];

export const licensureStatusOptions: DropdownOption[] = [
  { value: "unlicensed facility", label: "unlicensed facility", cost: 0 },
  { value: "licensed facility", label: "licensed facility", cost:  500 },
];

export const trainingNeedsOptions: DropdownOption[] = [
  {value: "No special training needs beyond those required", label: "No special training needs beyond those required", cost: 0 },
  {value: "Special behavioral or medical management needs beyond those required", label: "Special behavioral or medical management needs beyond those required", cost: 500 }
];

export const parentCompanyOptions: DropdownOption[] = [
  { label: "Company One", value: "Company One"},
  { label: "Company Two", value: "Company Two"},
  { label: "Company Three", value: "Company Three"},
  { label: "Company Four", value: "Company Four"},
];

export const programNameOptions: DropdownOption[] = [
  { label: "Program One", value: "Program One"},
  { label: "Program Two", value: "Program Two"},
  { label: "Program Three", value: "Program Three"},
  { label: "Program Four", value: "Program Four"},
];
export const reportSpendingService: DropdownOption[] = [
  { label: "Program One", value: "Program One"},
  { label: "Program Two", value: "Program Two"},
  { label: "Program Three", value: "Program Three"},
  { label: "Program Four", value: "Program Four"},
];

export const denialReasonOptions: DropdownOption[] = [
  { label: "Inappropriate", value: "Inappropriate"},
  { label: "Other", value: "Other"},
];
export const dementiaOptions: DropdownOption[] = [
  { label: "Yes", value: "Yes"},
  { label: "No", value: "No"},
];
export const TransitionPlacementOptions: DropdownOption[] = [
  { label: "No Selection(all)", value: "No Selection(all)"},
  { label: "Hospital", value: "Hospital"},
  { label: "Jail", value: "Jail"},
  { label: "Home/Family/Independent Living", value: "Home/Family/Independent Living"},
  { label: "Nursing Home", value: "Nursing Home"},
  { label: "ALF", value: "ALF"},
  { label: "Other", value: "Other"},
];
export const dischargeDiversionOptions: DropdownOption[] = [
  { label: "Hospital Discharge", value: "Hospital Discharge"},
  { label: "Hospital Diversion", value: "Hospital Diversion"},
];

export const legalStatusOptions: DropdownOption[] = [
  { label: "US Citizen", value: "US Citizen"},
  { label: "Legal Permanent Resident", value: "Legal Permanent Resident"},
  { label: "Refugee", value: "Refugee"},
];