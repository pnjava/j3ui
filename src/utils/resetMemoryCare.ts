import { FieldValues, UseFormReturn } from "react-hook-form";

export const resetMemoryCare = (formMethods: UseFormReturn<FieldValues>) => {
  const { getValues, setValue } = formMethods;
  const formData = getValues();

  if (formData.memoryCareQ1Dementia === false) {
    setValue("memoryCareApprovalByCts", null);
    setValue("memoryCareApprovalDate", "");
    setValue("memoryCareQ2Diagnosis", "");
    setValue("memoryCareQ3Mobility", "");
    setValue("memoryCareQ4Elopement", "");
    setValue("memoryCareQ5Unsafe", "");
    setValue("memoryCareQ6Monitoring", "");
    setValue("memoryCareQ7Cognitive", "");
  }
}
