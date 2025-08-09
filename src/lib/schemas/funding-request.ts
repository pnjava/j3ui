import { z } from "zod";

const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
const mrnRegex = /^\d{6,7}$/;

export const fundingRequestSchema = z.object({
  planId: z.string(),
  individualId: z.string().uuid("Invalid individualId format"),
  regionId: z.string().optional(),
  status: z.enum([
    "DRAFT",
    "SUBMITTED",
    "RM_APPROVED",
    "RC_APPROVED",
    "SC_APPROVED",
    "EMERGENCY_APPROVED",
    "APPROVED",
    "ACTIVE",
    "CLOSED",
    "RC_REJECTED",
    "SC_REJECTED",
    "RM_CHECK",
    "VOTING_COMPLETE",
  ]),
  csbId: z.string().optional(),
  organizationName: z.string(),
  requestorName: z.string().max(500).optional(),
  dateOfRequest: z.string().optional(),
  typeOfFunds: z.enum(["ONGOING", "ONE_TIME", "RESIDENTIAL_RATE_SIMULATION"], {
    errorMap: () => ({ message: "Type of funds is required" }),
  }),
  isPlanModification: z.coerce.boolean().optional(),
  originalPlanAmount: z.coerce.number().max(999999, "Amount cannot exceed 999,999").optional(),
  requestedAmount: z.coerce.number().optional(),

  isOutOfCatchment: z.boolean().optional(),
  hasOutOfCatchmentReferralCompleted: z.boolean().nullable().optional(),
  hasReceivingCoordinatorConsulted: z.boolean().nullable().optional(),
  receivingCoordinatorConsulted: z.string().max(500).optional(),
  receivingCoordinatorConsultedDate: z.string().optional(),
  receivingCoordinatorNotConsultedReason: z.string().max(500).optional(),

  patientResourcesIsAuxiliaryGrantEligible: z.boolean().optional(),
  patientResourcesPersonResponsibleForAcquisitionOfBenefits: z
    .string()
    .max(500)
    .optional(),
  patientResourcesIsIdDd: z.boolean().optional(),
  patientResourcesWaiverStatus: z.string().optional(),
  patientResourcesInsurance: z.string().optional(),
  patientResourcesIncome: z.number().optional(),
  patientResourcesOther: z.string().max(500).or(z.number()).optional(),

  dischargeBarriersBriefDescription: z.string().max(500).optional(),
  dischargeBarriersAlternativesToDapAttempted: z.string().max(500).optional(),
  dischargeBarriersPlanStepDown: z.string().max(500).optional(),

  memoryCareResidentialProvider: z.string().optional(),
  memoryCareResidentialProviderAddress: z.string().max(500).optional(),
  memoryCarePlacement: z.boolean().optional(),
  memoryCareApprovalByCts: z.boolean().nullable().optional(),
  memoryCareApprovalDate: z.string().optional(),
  memoryCareQ1Dementia: z.boolean().optional(),
  memoryCareQ1Notes: z.string().max(500).optional(),
  memoryCareQ2Diagnosis: z.string().max(500).optional(),
  memoryCareQ3Mobility: z.string().max(500).optional(),
  memoryCareQ4Elopement: z.string().max(500).optional(),
  memoryCareQ4Notes: z.string().max(500).optional(),
  memoryCareQ5Unsafe: z.string().max(500).optional(),
  memoryCareQ5Notes: z.string().max(500).optional(),
  memoryCareQ6Monitoring: z.string().max(500).optional(),
  memoryCareQ6Notes: z.string().max(500).optional(),
  memoryCareQ7Cognitive: z.string().max(500).optional(),
  memoryCareQ7Notes: z.string().max(500).optional(),

  isResidentialCareNeeded: z.boolean().optional(),
  facilityLocationCsbRegion: z.string().optional(),
  potentialPlacementFacilityType: z.string().optional(),
  adlsAndAmbulation: z.string().optional(),
  continence: z.string().optional(),
  eatingAndFeeding: z.string().optional(),
  bathingDressingToiletingAndTransfers: z.string().optional(),
  majorActiveDiagnoses1: z.string().optional(),
  majorActiveDiagnoses2: z.string().optional(),
  majorActiveDiagnoses3: z.string().optional(),
  sensoryFunctions: z.string().optional(),
  personCompletingRequest: z.string().max(500).optional(),
  personReviewingAuthorizing: z.string().max(500).optional(),
  behaviorPattern: z.string().optional(),
  behavioralInterventionAssaults: z.string().optional(),
  behavioralInterventionAssaultsNotes: z.string().max(500).optional(),
  behavioralInterventionDestruction: z.string().optional(),
  behavioralInterventionDestructionNotes: z.string().max(500).optional(),
  behavioralInterventionStealing: z.string().optional(),
  behavioralInterventionStealingNotes: z.string().max(500).optional(),
  behavioralInterventionSelfInjury: z.string().optional(),
  behavioralInterventionSelfInjuryNotes: z.string().max(500).optional(),
  behavioralInterventionIntrusiveBehavior: z.string().optional(),
  behavioralInterventionIntrusiveBehaviorNotes: z.string().max(500).optional(),
  behavioralInterventionSuicide: z.string().optional(),
  behavioralInterventionSuicideNotes: z.string().max(500).optional(),
  behavioralInterventionSexualAggression: z.string().optional(),
  behavioralInterventionSexualAggressionNotes: z.string().max(500).optional(),
  behavioralInterventionNonAggressive: z.string().optional(),
  behavioralInterventionNonAggressiveNotes: z.string().max(500).optional(),
  behavioralInterventionTantrums: z.string().optional(),
  behavioralInterventionTantrumsNotes: z.string().max(500).optional(),
  behavioralInterventionWandering: z.string().optional(),
  behavioralInterventionWanderingNotes: z.string().max(500).optional(),
  behavioralInterventionSubstanceAbuse: z.string().optional(),
  behavioralInterventionSubstanceAbuseNotes: z.string().max(500).optional(),
  behavioralInterventionMaintenance: z.string().optional(),
  behavioralInterventionMaintenanceNotes: z.string().max(500).optional(),

  descriptionOfBehaviors: z.string().optional(),

  totalBehaviorsAmount: z.number().optional(),
  totalPatientCareNeedsAmount: z.number().optional(),
  patientCareNeedsCapAmount: z.number().optional(),
  totalAuthorizedCareAmount: z.number().optional(),
  extraordinaryCircumstancesPaymentRequestDescription: z
    .string()
    .max(500)
    .optional(),
  socialHistoryNgri: z.string().optional(),
  socialHistorySexOffender: z.string().optional(),
  socialHistoryArson: z.string().optional(),
  socialHistoryOther: z.string().optional(),
  totalAuthorizedCareMonthlyPayment: z.number().optional(),
  socialWorkNote: z.string().optional(),
  totalSocialHistoryAmount: z.number().optional(),
  socialHistoryCapAmount: z.number().optional(),
  totalAuthorizedSocialHistoryAmount: z.number().optional(),
  licensureStatus: z.string().optional(),
  trainingNeeds: z.string().optional(),
  totalFacilityAmount: z.number().optional(),
  totalFacilityCapAmount: z.number().optional(),
  totalAuthoroizedSocialHistoryOneTimeAddOnPaymentAmount: z.number().optional(),

  // { code: 012, coreServiceCategory: 'Supervised Residential - ALF', projectedMonthsNeeded: 6, unitCost: 3000, projectedAnnualUnits: 6, projectedOtherFunds: 800, selfPay: 1000 } : === Projected Annual Cost, IDAPP Cost -- feeds into Totals for both of those

  plan_start_date: z.string().optional(),
  plan_end_date: z.string().max(10, "Invalid date format").optional(),
  plan_expired_date: z.string().optional(),

  created_date: z.string(),
  created_by: z.string(),
  last_updated_date: z.string().optional(),
  last_updated_by: z.string().optional(),
  deleted_date: z.string().optional(),
  deleted_by: z.string().optional(),

  mrn: z
    .string()
    .min(1, "mrn cannot be empty")
    .regex(mrnRegex, "mrn must be 6 or 7 digit number")
    .optional(),
  fin: z.string().min(1, "fin cannot be empty").optional(),
  state_hospital: z
    .string()
    .min(1, "state_hospital cannot be empty")
    .optional(),
  state_hospital_admission_date: z
    .string()
    .min(1, "state_hospital_admission_date cannot be empty")
    .regex(
      dateRegex,
      "Invalid state_hospital_admission_date format (mm/dd/yyyy)"
    )
    .optional(),
  state_hospital_discharge_date: z
    .string()
    .min(1, "state_hospital_discharge_date cannot be empty")
    .regex(
      dateRegex,
      "Invalid state_hospital_discharge_date date format (mm/dd/yyyy)"
    )
    .optional(),
  first_name: z.string().min(1, "first_name cannot be empty").optional(),
  last_name: z.string().min(1, "last_name cannot be empty").optional(),
  middle_name: z.string().min(1, "middle_name cannot be empty").optional(),
  dob: z
    .string()
    .min(1, "dob cannot be empty")
    .regex(dateRegex, "Invalid dob format (mm/dd/yyyy)")
    .optional(),
  legal_status: z.string().min(1, "legal_status cannot be empty").optional(),

  isCustomRatePlanModification: z.boolean().optional(),
  applicationDate: z.string().optional(),
  csbContactInformation: z.string().max(500).optional(),
  providerContactInformation: z.string().max(500).optional(),
  serviceRequested: z.string().optional(),
  transitionalService: z.string().optional(),
  allOtherServices: z.string().optional(),
  describeIndividualsNeedForService: z.string().max(500).optional(),
  whoWillProvideTheService: z.string().optional(),
  numberOfHoursRequestedPerDay: z.number().nonnegative().max(24).nullable().optional(),
  specifyTimes: z.string().max(500).optional(),
  forProgrammaticOversightCheckbox1: z.boolean().optional(),
  forProgrammaticOversightCheckbox2: z.boolean().optional(),
  forProgrammaticOversightCheckbox3: z.boolean().optional(),
  forProgrammaticOversightCheckbox4: z.boolean().optional(),
  forProgrammaticOversightCheckbox5: z.boolean().optional(),
  forProgrammaticOversightCheckbox6: z.boolean().optional(),
  customRatePlanRegionalCommitteePersonApproving: z
    .string()
    .max(500)
    .optional(),
  customRatePlanRegionalCommitteeApprovalNotes: z.string().max(500).optional(),
  customRatePlanStateWideCommitteePersonApproving: z
    .string()
    .max(500)
    .optional(),
  customRatePlanStateWideCommitteeApprovalNotes: z.string().max(500).optional(),
  customRatePlanStateWideCommitteeApprovalStatus: z
    .string()
    .max(500)
    .optional(),
  customRatePlanRegionalCommitteeApprovalStatus: z.string().max(500).optional(),
  customRatePlanRegionalManagerPersonApproving: z.string().max(500).optional(),
  customRatePlanRegionalManagerApprovalNotes: z.string().max(500).optional(),
  customRatePlanRegionalManagerApprovalStatus: z.string().max(500).optional(),
  customRatePlanCTSApprovalComments: z.string().max(500).optional(),

  planVotes: z
    .array(
      z.object({
        personReviewingEmail: z.string().max(500).optional(),
        personReviewingAuthorizing: z.string().max(500).optional(),
        csbLocationFacility: z.string().max(500).optional(),
        decision: z.boolean().nullable().optional(),
        decisionTimestamp: z.string().optional(),
      })
    )
    .optional(),
  scrubOfPlanId: z.string().optional(),
  tableOfCost: z
    .array(
      z.object({
        serviceCategory: z.string().optional(),
        notes: z.string().optional(),
        projectedMonthsNeeded: z.coerce.number().optional(),
        unitCostPerMonthAmount: z.coerce.number().optional(),
        projectedAnnualUnits: z.coerce.number().optional(),
        projectedOtherFundsPerMonthAmount: z.coerce.number().optional(),
        selfPayPerMonthAmount: z.coerce.number().optional(),
      })
    )
    .optional(),
});

export const updatePlanSchema = fundingRequestSchema
  .partial()
  .omit({
    individualId: true,
    planId: true,
    created_by: true,
    created_date: true,
    last_updated_date: true,
    deleted_by: true,
    deleted_date: true,
  });

export type FundingRequestData = z.infer<typeof fundingRequestSchema>;
