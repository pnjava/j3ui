import { FieldValues, UseFormReturn } from "react-hook-form";

export const resetCustomRate = (formMethods: UseFormReturn<FieldValues>): void => {
  const { getValues, setValue } = formMethods;
  const formData = getValues();

  if (formData.isCustomRatePlanModification === false) {
    setValue("applicationDate", "");
    setValue("csbContactInformation", "");
    setValue("providerContactInformation", "");
    setValue("serviceRequested", "");
    setValue("transitionalService", "");
    setValue("allOtherServices", "");
    setValue("describeIndividualsNeedForService", "");
    setValue("whoWillProvideTheService", "");
    setValue("numberOfHoursRequestedPerDay", 0);
    setValue("specifyTimes", "");
    setValue("forProgrammaticOversightCheckbox1", false);
    setValue("forProgrammaticOversightCheckbox2", false);
    setValue("forProgrammaticOversightCheckbox3", false);
    setValue("forProgrammaticOversightCheckbox4", false);
    setValue("forProgrammaticOversightCheckbox5", false);
    setValue("forProgrammaticOversightCheckbox6", false);
  }
}

