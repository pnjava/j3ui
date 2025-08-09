export interface Plan {
  values?: Set<Record<string, unknown>>;
  planId: string;
  individualId: string;
  regionId: string;
  status:
    | "DRAFT"
    | "SUBMITTED"
    | "RM_APPROVED"
    | "RC_APPROVED"
    | "SC_APPROVED"
    | "EMERGENCY_APPROVED"
    | "APPROVED"
    | "ACTIVE"
    | "CLOSED"
    | "RC_REJECTED"
    | "SC_REJECTED"
    | "RM_CHECK"
    | "VOTING_COMPLETE";
  csbId: string;
  organizationName: string;
  requestorName: string;
  dateOfRequest: string;
  typeOfFunds: "ONGOING" | "ONE_TIME" | "RESIDENTIAL_RATE_SIMULATION";
  isPlanModification: boolean;
  originalPlanAmount: number;
  requestedAmount: number;

  isOutOfCatchment: boolean;
  hasOutOfCatchmentReferralCompleted: boolean | null;
  hasReceivingCoordinatorConsulted: boolean | null;
  receivingCoordinatorConsulted: string;
  receivingCoordinatorConsultedDate: string;
  receivingCoordinatorNotConsultedReason: string;

  patientResourcesIsAuxiliaryGrantEligible: boolean;
  patientResourcesPersonResponsibleForAcquisitionOfBenefits: string;
  patientResourcesIsIdDd: boolean;
  patientResourcesWaiverStatus: string;
  patientResourcesInsurance: string;
  patientResourcesIncome: number;
  patientResourcesOther: string | number;

  dischargeBarriersBriefDescription: string;
  dischargeBarriersAlternativesToDapAttempted: string;
  dischargeBarriersPlanStepDown: string;

  memoryCareResidentialProvider: string;
  memoryCareResidentialProviderAddress: string;
  memoryCarePlacement: boolean;
  memoryCareApprovalByCts: boolean | null; // TODO: defaultValues from react-hook-form
  memoryCareApprovalDate: string;
  memoryCareQ1Dementia: boolean;
  memoryCareQ1Notes: string;
  memoryCareQ2Diagnosis: string;
  memoryCareQ3Mobility: string;
  memoryCareQ4Elopement: string;
  memoryCareQ4Notes: string;
  memoryCareQ5Unsafe: string;
  memoryCareQ5Notes: string;
  memoryCareQ6Monitoring: string;
  memoryCareQ6Notes: string;
  memoryCareQ7Cognitive: string;
  memoryCareQ7Notes: string;

  isResidentialCareNeeded: boolean;
  facilityLocationCsbRegion: string;
  potentialPlacementFacilityType: string;
  adlsAndAmbulation: string;
  continence: string;
  eatingAndFeeding: string;
  bathingDressingToiletingAndTransfers: string;
  sensoryFunctions: string;
  behaviorPattern: string;
  descriptionOfBehaviors: string;

  totalBehaviorsAmount: number;
  totalPatientCareNeedsAmount: number;
  patientCareNeedsCapAmount: number;
  totalAuthorizedCareAmount: number;
  extraordinaryCircumstancesPaymentRequestDescription: string;
  socialHistoryNgri: string;
  socialHistorySexOffender: string;
  socialHistoryArson: string;
  socialHistoryOther: string;
  totalAuthorizedCareMonthlyPayment: number;
  socialWorkNote: string;
  totalSocialHistoryAmount: number;
  socialHistoryCapAmount: number;
  totalAuthorizedSocialHistoryAmount: number;
  licensureStatus: string;
  trainingNeeds: string;
  totalFacilityAmount: number;
  totalFacilityCapAmount: number;
  totalAuthoroizedSocialHistoryOneTimeAddOnPaymentAmount: number;

  isCustomRatePlanModification: boolean;
  applicationDate: string;
  csbContactInformation: string;
  providerContactInformation: string;
  serviceRequested: string;
  transitionalService: string;
  allOtherServices: string;
  describeIndividualsNeedForService: string;
  whoWillProvideTheService: string;
  numberOfHoursRequestedPerDay: number;
  specifyTimes: string;
  forProgrammaticOversightCheckbox1: boolean;
  forProgrammaticOversightCheckbox2: boolean;
  forProgrammaticOversightCheckbox3: boolean;
  forProgrammaticOversightCheckbox4: boolean;
  forProgrammaticOversightCheckbox5: boolean;
  forProgrammaticOversightCheckbox6: boolean;
  customRatePlanRegionalCommitteePersonApproving: string;
  customRatePlanRegionalCommitteeApprovalNotes: string;
  customRatePlanStateWideCommitteePersonApproving: string;
  customRatePlanStateWideCommitteeApprovalNotes: string;
  customRatePlanStateWideCommitteeApprovalStatus?: string;
  customRatePlanRegionalCommitteeApprovalStatus?: string;
  customRatePlanRegionalManagerPersonApproving: string;
  customRatePlanRegionalManagerApprovalNotes?: string;
  customRatePlanRegionalManagerApprovalStatus?: string;
  customRatePlanCTSApprovalComments?: string;

  planVotes?: {
    personReviewingEmail?: string;
    personReviewingAuthorizing?: string;
    csbLocationFacility?: string;
    decision: boolean | null;
    decisionTimestamp?: string;
  }[];

  scrubOfPlanId?: string;

  tableOfCost?: {
    serviceCategory?: string;
    notes?: string;
    projectedMonthsNeeded?: number;
    unitCostPerMonthAmount?: number;
    projectedAnnualUnits?: number;
    projectedOtherFundsPerMonthAmount?: number;
    selfPayPerMonthAmount?: number;
  }[];

  mrn: string;
  fin?: string;
  state_hospital: string;
  state_hospital_admission_date: string;
  state_hospital_discharge_date: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  dob: string;
  legal_status?: string;

  plan_start_date: string;
  plan_end_date: string;
  plan_expired_date: string;

  created_date: string;
  created_by: string;
  last_updated_date: string;
  last_updated_by: string;
  deleted_date: string;
  deleted_by: string;
  is_delete?: boolean;
  ttl_duration?:number;
}

export interface Totals {
  totalAnnualCost: number;
  totalOtherFunds: number;
  totalSelfPay: number;
  totalIDAPPCost: number;
}
export interface TableOfCost {
  length: number;
  serviceCategory?: string;
  notes?: string;
  projectedMonthsNeeded?: number;
  unitCostPerMonthAmount?: number;
  projectedAnnualUnits?: number;
  projectedOtherFundsPerMonthAmount?: number;
  selfPayPerMonthAmount?: number;
}
