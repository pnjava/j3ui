import { z } from "zod";
import { fundingRequestSchema } from "./funding-request";

export const fundingRequestSubmitSchema = fundingRequestSchema.extend({
  // Discharge Request Section
  csbId: z.string().min(1, "CSB is required"),
  requestorName: z.string()
    .min(1, "Requestor name is required")
    .max(500),
  dateOfRequest: z.string()
    .min(1, "Date of request is required")
    .max(10, "Invalid date format"),
  plan_start_date: z.string()
    .min(1, "Plan start date is required")
    .max(10, "Invalid date format"),
  plan_end_date: z.string().max(10, "Invalid date format").optional(),
  isPlanModification: z.boolean({
    required_error: "Please specify if this is a plan modification",
  }),
  requestedAmount: z.coerce.number({
    required_error: "Requested amount is required",
  }).min(1),

  // Catchment Plan Section
  isOutOfCatchment: z.union([z.literal(true), z.literal(false)], {
    errorMap: () => ({
      message: "Catchment information is required",
    }),
  }),
  hasOutOfCatchmentReferralCompleted: z.boolean().nullable().optional(),
  hasReceivingCoordinatorConsulted: z.boolean().nullable().optional(),
  receivingCoordinatorConsulted: z.string().max(500).optional(),
  receivingCoordinatorConsultedDate: z.string().optional(),
  receivingCoordinatorNotConsultedReason: z.string().max(500).optional(),

  // Memory Care Section
  memoryCareQ1Dementia: z.union([z.literal(true), z.literal(false)], {
    errorMap: () => ({
      message: "Dementia diagnosis is required",
    }),
  }),
  memoryCareQ2Diagnosis: z.string().max(1000).optional(),
  memoryCareQ3Mobility: z.string().max(1000).optional(),
  memoryCareQ4Elopement: z.string().optional(),
  memoryCareQ5Unsafe: z.string().optional(),
  memoryCareQ6Monitoring: z.string().optional(),
  memoryCareQ7Cognitive: z.string().optional(),

  // Patient Resources Section
  patientResourcesPersonResponsibleForAcquisitionOfBenefits: z
  .string({
    required_error: "Please specify who is responsible for acquisition of benefits.",
  })
  .min(1, { message: "Please specify who is responsible for acquisition of benefits."}).max(500),
  patientResourcesIsAuxiliaryGrantEligible: z.boolean({
    required_error: "Please indicate whether the patient is eligible for an Auxiliary Grant.",
  }),
  patientResourcesIsIdDd: z.boolean({
    required_error: "Please indicate whether the patient has an ID/DD.",
  }),
  patientResourcesWaiverStatus: z.string({
    required_error: "Please specify the patient's waiver status.",
  }).min(1, { message: "Please specify the patient's waiver status."}),
  patientResourcesInsurance: z.string({
    required_error: "Please specify the patient's insurance information.",
  }).min(1, { message: "Please specify the patient's insurance information."}),

  // Discharge Barriers Section
  dischargeBarriersBriefDescription: z.string({
    required_error: "Please provide a brief description of the discharge barriers.",
  }).min(1, { message: "Please provide a brief description of the discharge barriers." }).max(500),
  dischargeBarriersAlternativesToDapAttempted: z.string({
    required_error: "Please provide alternatives to DAP attempted.",
  }).min(1, { message: "Please provide alternatives to DAP attempted." }).max(500),  

  // Residential Care Section
  isResidentialCareNeeded: z.union([z.literal(true), z.literal(false)], {
    errorMap: () => ({
      message: "Please indicate if residential care is needed.",
    }),
  }),
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
  behaviorPattern: z.string().optional(),
  behavioralInterventionAssaults: z.string().optional(),
  behavioralInterventionDestruction: z.string().optional(),
  behavioralInterventionStealing: z.string().optional(),
  behavioralInterventionSelfInjury: z.string().optional(),
  behavioralInterventionIntrusiveBehavior: z.string().optional(),
  behavioralInterventionSuicide: z.string().optional(),
  behavioralInterventionSexualAggression: z.string().optional(),
  behavioralInterventionNonAggressive: z.string().optional(),
  behavioralInterventionTantrums: z.string().optional(),
  behavioralInterventionWandering: z.string().optional(),
  behavioralInterventionSubstanceAbuse: z.string().optional(),
  behavioralInterventionMaintenance: z.string().optional(),
  personCompletingRequest: z.string().optional(),

  //Custom Rate Section
  isCustomRatePlanModification: z.boolean().optional(),
  applicationDate: z.string().optional(),
  csbContactInformation: z.string().max(500).optional(),
  providerContactInformation: z.string().max(500).optional(),
  serviceRequested: z.string().optional(),
  transitionalService: z.string().optional(),
  allOtherServices: z.string().optional(),
  whoWillProvideTheService: z.string().optional(),
  numberOfHoursRequestedPerDay: z.number().nonnegative().min(0).max(24).optional(),
  specifyTimes: z.string().max(500).optional(),
  documentationFiles: z.array(
      z.any().optional()
    ).optional(),
})

.superRefine((data, ctx) => {
  // Plan end date can't be earlier than start date
  if (data.plan_end_date && data.plan_start_date) {
    const start = new Date(data.plan_start_date);
    const end = new Date(data.plan_end_date);

    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end < start) {
      ctx.addIssue({
        path: ["plan_end_date"],
        message: "Plan end date cannot be earlier than plan start date.",
        code: z.ZodIssueCode.custom,
      });
    }
  }

  // Plan end date is required if it's a One Time plan
  if (data.typeOfFunds === "ONE_TIME" && !data.plan_end_date) {
    ctx.addIssue({
      path: ["plan_end_date"],
      code: z.ZodIssueCode.custom,
      message: "Plan end date is required for ONE TIME plans",
    });
  }

  // Catchment form dependencies
  if (data.isOutOfCatchment === true) {
    if (typeof data.hasOutOfCatchmentReferralCompleted !== "boolean") {
      ctx.addIssue({
        path: ["hasOutOfCatchmentReferralCompleted"],
        message: "Referral must be completed for out-of-catchment clients.",
        code: z.ZodIssueCode.custom,
      });
    }
  
    if (typeof data.hasReceivingCoordinatorConsulted !== "boolean") {
      ctx.addIssue({
        path: ["hasReceivingCoordinatorConsulted"],
        message: "Please indicate whether a receiving coordinator was consulted.",
        code: z.ZodIssueCode.custom,
      });
    } else if (data.hasReceivingCoordinatorConsulted === true) {
      if (!data.receivingCoordinatorConsulted?.trim()) {
        ctx.addIssue({
          path: ["receivingCoordinatorConsulted"],
          message: "Please provide details of the receiving coordinator consultation.",
          code: z.ZodIssueCode.custom,
        });
      }
  
      if (!data.receivingCoordinatorConsultedDate?.trim()) {
        ctx.addIssue({
          path: ["receivingCoordinatorConsultedDate"],
          message: "Please provide the date of the receiving coordinator consultation.",
          code: z.ZodIssueCode.custom,
        });
      }
    } else if (data.hasReceivingCoordinatorConsulted === false) {
      if (!data.receivingCoordinatorNotConsultedReason?.trim()) {
        ctx.addIssue({
          path: ["receivingCoordinatorNotConsultedReason"],
          message: "Please provide a reason for not consulting a receiving coordinator.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  }

  //Memory Care Dependencies
  if (data.memoryCareQ1Dementia) {
    const memoryCareRequiredFields: { key: keyof typeof data; label: string }[] = [
      { key: "memoryCareQ2Diagnosis", label: "Diagnosis" },
      { key: "memoryCareQ3Mobility", label: "Mobility" },
      { key: "memoryCareQ4Elopement", label: "Elopement" },
      { key: "memoryCareQ5Unsafe", label: "Unsafe behaviors" },
      { key: "memoryCareQ6Monitoring", label: "Monitoring" },
      { key: "memoryCareQ7Cognitive", label: "Cognitive functioning" },
    ];

    for (const field of memoryCareRequiredFields) {
      const value = data[field.key];
      const isBlank = value === undefined || value === null || (typeof value === "string" && value.trim() === "");
      if (isBlank) {
        ctx.addIssue({
          path: [field.key],
          message: `${field.label} is required when patient has dementia.`,
          code: z.ZodIssueCode.custom,
        });
      }
    }
  }

  // DAP Residential Rate Dependencies
  if (data.isResidentialCareNeeded) {
    const ResidentialCareRequiredFields: { key: keyof typeof data; label: string }[] = [
      { key: "facilityLocationCsbRegion", label: "Facility location CSB region" },
      { key: "potentialPlacementFacilityType", label: "Potential placement facility type" },
      { key: "adlsAndAmbulation", label: "ADLs and ambulation" },
      { key: "continence", label: "Continence" },
      { key: "eatingAndFeeding", label: "Eating and feeding" },
      { key: "bathingDressingToiletingAndTransfers", label: "Bathing, dressing, toileting and transfers" },
      { key: "majorActiveDiagnoses1", label: "Major active diagnosis 1" },
      { key: "majorActiveDiagnoses2", label: "Major active diagnosis 2" },
      { key: "majorActiveDiagnoses3", label: "Major active diagnosis 3" },
      { key: "sensoryFunctions", label: "Sensory functions" },
      { key: "behaviorPattern", label: "Behavior pattern" },
      { key: "personCompletingRequest", label: "Person completing request" },
    ];

    for (const field of ResidentialCareRequiredFields) {
      const value = data[field.key];
      const isBlank = value === undefined || value === null || (typeof value === "string" && value.trim() === "");
      if (isBlank) {
        ctx.addIssue({
          path: [field.key],
          message: `${field.label} is required when patient needs Residential Care.`,
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (!data.behaviorPattern) {
      ctx.addIssue({
        path: ["behaviorPattern"],
        message: "Please select a valid behavior pattern.",
        code: z.ZodIssueCode.custom,
      });
    } else {

      const criticalPatterns = [
        " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
        " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more",
      ];

      if (criticalPatterns.includes(data.behaviorPattern)) {    
        const behaviorFields: { key: keyof typeof data; label: string }[] = [
          { key: "behavioralInterventionAssaults", label: "Prevention of assaults or injuries to others" },
          { key: "behavioralInterventionDestruction", label: "Prevention of property destruction" },
          { key: "behavioralInterventionStealing", label: "Prevention of stealing" },
          { key: "behavioralInterventionSelfInjury", label: "Prevention of self-injury" },
          { key: "behavioralInterventionIntrusiveBehavior", label: "Prevention of Intrusive Behavior with Peers" },
          { key: "behavioralInterventionSuicide", label: "Prevention of suicide attempts" },
          { key: "behavioralInterventionSexualAggression", label: "Prevention of sexual aggression" },
          { key: "behavioralInterventionNonAggressive", label: "Prevention of non-aggressive but inappropriate behavior" },
          { key: "behavioralInterventionTantrums", label: "Prevention of tantrums or emotional outbursts" },
          { key: "behavioralInterventionWandering", label: "Prevention of wandering" },
          { key: "behavioralInterventionSubstanceAbuse", label: "Prevention of substance abuse" },
          { key: "behavioralInterventionMaintenance", label: "Maintenance of mental health treatments" },
        ];
      
        for (const { key, label } of behaviorFields) {
          const fieldValue = data[key];
          const isValueBlank = fieldValue === undefined || fieldValue === null || (typeof fieldValue === "string" && fieldValue.trim() === "");
          if (isValueBlank) {
            ctx.addIssue({
              path: [key],
              message: `${label} is required when the behavior pattern involves aggression or disruption.`,
              code: z.ZodIssueCode.custom,
            });
          }

          const supportLevels = ["some support needed", "extensive support needed"];
          const normalizedValue = typeof fieldValue === "string" ? fieldValue.trim().toLowerCase() : "";
          if (supportLevels.includes(normalizedValue)) {
            const notesKey = `${key}Notes` as keyof typeof data;
            const notesValue = data[notesKey];
            const isNotesBlank = !notesValue || (typeof notesValue === "string" && notesValue.trim() === "");
            if (isNotesBlank) {
              ctx.addIssue({
                path: [notesKey],
                message: `Notes are required when support is needed.}`,
                code: z.ZodIssueCode.custom,
              });
            }
          }
        }
      }
    }
  }
  // Custom Rate Plan Modification Dependency
  if (data.isCustomRatePlanModification) {
    const customRatePlanRequiredFields: { key: keyof typeof data; label: string }[] = [
      { key: "applicationDate", label: "Application Date" },
      { key: "csbContactInformation", label: "CSB Contact Information" },
      { key: "providerContactInformation", label: "Provider Contact Information" },
      { key: "serviceRequested", label: "Service Requested" },
      { key: "whoWillProvideTheService", label: "Who Will Provide The Service" },
      { key: "specifyTimes", label: "Specify Times" },
    ];

    for (const field of customRatePlanRequiredFields) {
      const value = data[field.key];
      const isBlank = value === undefined || value === null || (typeof value === "string" && value.trim() === "");
      if (isBlank) {
        ctx.addIssue({
          path: [field.key],
          message: `${field.label} is required when a custom rate plan modification is selected.`,
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // Validate based on Services Requested
    const serviceRequestedValue = data.serviceRequested;

    if (serviceRequestedValue === "Transitional Support") {
      const isBlank =
        data.transitionalService === undefined ||
        data.transitionalService === null ||
        (typeof data.transitionalService === "string" && data.transitionalService.trim() === "");

      if (isBlank) {
        ctx.addIssue({
          path: ["transitionalService"],
          message: 'Transitional Service is required when Transitional Support is selected.',
          code: z.ZodIssueCode.custom,
        });
      }
    } else {
      const isBlank =
        data.allOtherServices === undefined ||
        data.allOtherServices === null ||
        (typeof data.allOtherServices === "string" && data.allOtherServices.trim() === "");

      if (isBlank) {
        ctx.addIssue({
          path: ["allOtherServices"],
          message: 'All Other Services is required.',
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (serviceRequestedValue !== "Transitional Support") {
      const val = data.numberOfHoursRequestedPerDay;
      const isEmpty = val === undefined || val === null || !val || isNaN(val);
      const isOutOfRange = typeof val === "number" && (val < 1 || val > 24);
  
      if (isEmpty || isOutOfRange) {
        ctx.addIssue({
          path: ["numberOfHoursRequestedPerDay"],
          message: "Number of Hours Requested Per Day is required and must be between 1 and 24.",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // Validate checkboxes
    if (serviceRequestedValue === "Program Oversight") {
      const selectedCheckboxes = [
        data.forProgrammaticOversightCheckbox1,
        data.forProgrammaticOversightCheckbox2,
        data.forProgrammaticOversightCheckbox3,
        data.forProgrammaticOversightCheckbox4,
        data.forProgrammaticOversightCheckbox5,
        data.forProgrammaticOversightCheckbox6,
      ];

      const selectedCount = selectedCheckboxes.filter(value => value === true).length;

      if (selectedCount < 3) {
        ctx.addIssue({
          path: ['forProgrammaticOversightCheckbox1'],
          message: 'You must check at least 3 options.',
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // Validate documentationFiles
    if (data.documentationFiles?.length === 0) {
      ctx.addIssue({
        path: ["documentationFiles"],
        message: "Please upload at least one document.",
        code: z.ZodIssueCode.custom,
      });
    }
  }
})
.transform(({ documentationFiles, ...plan }) => plan);

export type FundingRequestSubmitData = z.infer<typeof fundingRequestSubmitSchema>;
