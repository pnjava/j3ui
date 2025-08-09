import { useFormContext, useWatch } from "react-hook-form";

export interface SectionDefinition {
  sectionId: string; // e.g., DISCHARGE_REQUEST, OVERVIEW, CATCHMENT_PLAN, etc.
  requiredFields: string[];
}

export function useStepCompletion(section: SectionDefinition) {
  let formContext;
  try {
    formContext = useFormContext();
  } catch (e) {
    formContext = null;
  }

  if (!formContext) {
    // Fallback values if no FormProvider is found.
    return {
      completedCount: 0,
      totalCount: section.requiredFields.length,
      fraction: 0,
      isComplete: false,
    };
  }

  const values = useWatch({
    name: section.requiredFields,
  });

  const totalCount = section.requiredFields.length;
  const completedCount = values.filter(
    (val) => val !== undefined && val !== null && val !== ""
  ).length;

  const fraction = totalCount > 0 ? completedCount / totalCount : 0;
  const isComplete = fraction === 1;

  return { completedCount, totalCount, fraction, isComplete };
}
