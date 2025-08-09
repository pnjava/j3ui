import { PatientFormStep, Step } from "../../lib/types";
import Button, { outlineButtonClasses } from "../custom-ui/Button";
import { useContext } from "react";
import { FormStepperContext } from "../../context/FormContext";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { validateAndScroll } from "../../utils/formStepper";
// import { usePlanMutations } from "../../hooks/mutations/usePlanMutations";
import { resetMemoryCare } from "../../utils/resetMemoryCare";
import { resetCatchmentPlan } from "../../utils/resetCatchmentPlan";
import { resetResidentialRate } from "../../utils/resetResidentialRate";
import { resetCustomRate } from "../../utils/resetCustomRate";
import { StoreContext } from "../../context/Store";
import { fundingRequestSchema } from "../../lib/schemas/funding-request";
import { findStepForField } from "../../utils/formStepper";

interface FormStepProps {
  children: React.ReactNode;
  step: Step;
  prevStep?: Step;
  cancel?: boolean;
  nextStep?: Step;
  extraButtons?: React.ReactNode;
}

const FormStep = ({
  children,
  step,
  prevStep,
  cancel,
  nextStep,
  extraButtons,
}: FormStepProps) => {
  const {
    step: currentStep,
    setStep,
    backRoute,
  } = useContext(FormStepperContext);

  const {
    trigger,
    getValues,
    setValue,
    formState: { isDirty, isLoading, errors },
  } = useFormContext();

  // const { updatePlanMutation } = usePlanMutations();
  const formMethods = useFormContext();
  const queryClient = useQueryClient();
  const { user } = useContext(StoreContext);
  const userRoles: string[] = user.currentUser?.role || [];

  async function saveAndContinue() {
    const fundingRequestConfig = queryClient.getQueryData([
      "fundingRequestConfig",
    ]) as any;
    validateAndScroll(formMethods, setStep, fundingRequestConfig);
    Promise.all([
      resetMemoryCare(formMethods),
      resetCatchmentPlan(formMethods),
      resetResidentialRate(formMethods),
      resetCustomRate(formMethods),
    ]).then(() => {
      const formData = getValues();
      console.log("🚀 ~ saveAndContinue ~ formData:", formData);
      // updatePlanMutation.mutate(
      //   { formData },
      //   {
      //     onSuccess: () => {
      //       setStep(nextStep || PatientFormStep.OVERVIEW);
      //     },
      //   }
      // );
    });
  }

  async function saveAndExit() {
    const fundingRequestConfig = queryClient.getQueryData([
      "fundingRequestConfig",
    ]) as {
      sections: { sectionId: string; fields: { name: string }[] }[];
    };

    // Validate using the base schema
    const result = fundingRequestSchema.safeParse(getValues());
    if (!result.success) {
      console.error("Zod schema validation failed:", result.error.flatten());

      const fieldErrors = result.error.flatten().fieldErrors;
      let scrolled = false;

      Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          formMethods.setError(field, {
            type: "manual",
            message: messages[0],
          });

          if (!scrolled) {
            const step = findStepForField(fundingRequestConfig, field);
            setStep(step);

            setTimeout(() => {
              const el = document.getElementById(field);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 400);

            scrolled = true;
          }
        }
      });

      return;
    }

    Promise.all([
      resetMemoryCare(formMethods),
      resetCatchmentPlan(formMethods),
      resetResidentialRate(formMethods),
      resetCustomRate(formMethods),
    ]).then(() => {
      const formData = getValues();
      console.log("🚀 ~ saveAndExit ~ formData:", formData);
      // updatePlanMutation.mutate(
      //   { formData },
      //   {
      //     onSuccess: () => {
      //       setStep(PatientFormStep.OVERVIEW);
      //     },
      //   }
      // );
    });
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue("isCustomRatePlanModification", false);
    saveAndExit();
  };

  return (
    <div className={step === currentStep ? "" : "hidden"}>
      {children}
      {/* {updatePlanMutation.isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-100 bg-opacity-90 z-50">
          <div className="flex flex-col items-center">
            <LoaderCircle className="animate-spin w-10 h-10 text-blue-500" />
            <p className="mt-4">Saving...</p>
          </div>
        </div>
      )} */}
      <div
        className={cn(
          "bg-white flex items-end justify-between px-12 pb-8 rounded-b",
          step === PatientFormStep.OVERVIEW && "hidden"
        )}
      >
        <div className="flex space-x-2">
          {prevStep && (
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                if (
                  userRoles.includes("DBHDS_DAP_PROGRAM_ADMIN") ||
                  userRoles.includes("DBHDS_DAP_CTS")
                ) {
                  saveAndExit();
                } else if (
                  userRoles.some((r) =>
                    [
                      "DBHDS_DAP_CSB_LIAISON",
                      "DBHDS_DAP_CSB_DAP_COORDINATOR",
                      "DBHDS_DAP_RM",
                    ].includes(r)
                  ) &&
                  ["EMERGENCY_APPROVED", "RC_APPROVED", "SC_APPROVED"].includes(
                    getValues("status")
                  )
                ) {
                  saveAndExit();
                } else {
                  setStep(prevStep);
                }
              }}
            >
              <ArrowLeft color="#00689a" />
              Back
            </Button>
          )}
          {cancel && (
            <Button
              variant="outline"
              className="text-[#00689a] text-base font-medium font-inter leading-normal rounded-md border border-[#00689a]"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          {backRoute && (
            <Button
              variant="outline"
              className={outlineButtonClasses}
              onClick={(e) => {
                e.preventDefault();
                saveAndExit();
              }}
            >
              Save & exit
            </Button>
          )}
          {nextStep &&
            !userRoles.includes("DBHDS_DAP_PROGRAM_ADMIN") &&
            !userRoles.includes("DBHDS_DAP_CTS") && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    userRoles.some((r) =>
                      [
                        "DBHDS_DAP_CSB_LIAISON",
                        "DBHDS_DAP_CSB_DAP_COORDINATOR",
                        "DBHDS_DAP_RM",
                      ].includes(r)
                    ) &&
                    [
                      "EMERGENCY_APPROVED",
                      "RC_APPROVED",
                      "SC_APPROVED",
                    ].includes(getValues("status"))
                  ) {
                    saveAndExit();
                  } else {
                    saveAndContinue();
                  }
                }}
              >
                Save & continue <ArrowRight />
              </Button>
            )}
          {extraButtons}
        </div>
      </div>
    </div>
  );
};

export default FormStep;
