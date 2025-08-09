import { FieldValues, UseFormReturn } from "react-hook-form";

const RESIDENTIAL_FIELDS = [
  "facilityLocationCsbRegion",
  "potentialPlacementFacilityType",
  "adlsAndAmbulation",
  "continence",
  "eatingAndFeeding",
  "bathingDressingToiletingAndTransfers",
  "majorActiveDiagnoses1",
  "majorActiveDiagnoses2",
  "majorActiveDiagnoses3",
  "sensoryFunctions",
  "behaviorPattern",
  "behavioralInterventionAssaults",
  "behavioralInterventionAssaultsNotes",
  "behavioralInterventionDestruction",
  "behavioralInterventionDestructionNotes",
  "behavioralInterventionStealing",
  "behavioralInterventionStealingNotes",
  "behavioralInterventionSelfInjury",
  "behavioralInterventionSelfInjuryNotes",
  "behavioralInterventionIntrusiveBehavior",
  "behavioralInterventionIntrusiveBehaviorNotes",
  "behavioralInterventionSuicide",
  "behavioralInterventionSuicideNotes",
  "behavioralInterventionSexualAggression",
  "behavioralInterventionSexualAggressionNotes",
  "behavioralInterventionNonAggressive",
  "behavioralInterventionNonAggressiveNotes",
  "behavioralInterventionTantrums",
  "behavioralInterventionTantrumsNotes",
  "behavioralInterventionWandering",
  "behavioralInterventionWanderingNotes",
  "behavioralInterventionSubstanceAbuse",
  "behavioralInterventionSubstanceAbuseNotes",
  "behavioralInterventionMaintenance",
  "behavioralInterventionMaintenanceNotes",
  "descriptionOfBehaviors",
  "extraordinaryCircumstancesPaymentRequestDescription",
  "socialHistoryNgri",
  "socialHistorySexOffender",
  "socialHistoryArson",
  "socialHistoryOther",
  "licensureStatus",
  "trainingNeeds",
  "personCompletingRequest",
  "personReviewingAuthorizing",
];

export function resetResidentialRate(
  formMethods: UseFormReturn<FieldValues>
): void {
  const { getValues, setValue, clearErrors } = formMethods;
  const data = getValues();

  if (data.isResidentialCareNeeded === false) {
    RESIDENTIAL_FIELDS.forEach((name) => {
      setValue(name, "", { shouldValidate: false, shouldDirty: true });
    });
    clearErrors(RESIDENTIAL_FIELDS);
  }
}
