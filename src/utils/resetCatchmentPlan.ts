import { UseFormReturn } from "react-hook-form";

export const resetCatchmentPlan = (formMethods: UseFormReturn<any>) => {
  const { getValues, setValue } = formMethods;
  const formData = getValues();

  if (formData.isOutOfCatchment === false) {
    setValue("hasOutOfCatchmentReferralCompleted", null);
    setValue("hasReceivingCoordinatorConsulted", null);
    setValue("receivingCoordinatorNotConsultedReason", "");
    setValue("receivingCoordinatorConsulted", "");
    setValue("receivingCoordinatorConsultedDate", "");
  }
}
