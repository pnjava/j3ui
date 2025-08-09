import { createContext, useState } from "react";
import { Step, StepLabelDict, StepWithRequiredFields } from "../lib/types";

interface FormStepperBaseProps {
  stepperLabels?: StepLabelDict | {};
  backRoute?: string;
}

interface FormStepperProviderProps extends FormStepperBaseProps {
  children: React.ReactNode;
  initialStep: Step;
}

interface FormStepperContextValue extends FormStepperBaseProps {
  step?: Step | StepWithRequiredFields;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
}

const FormStepperContext = createContext<FormStepperContextValue>({
  setStep: () => {},
  stepperLabels: {},
});

const FormStepperProvider = ({
  children,
  initialStep,
  stepperLabels,
  backRoute,
}: FormStepperProviderProps) => {
  const [step, setStep] = useState<Step>(initialStep);

  return (
    <FormStepperContext.Provider
      value={{ step, setStep, stepperLabels, backRoute }}
    >
      {children}
    </FormStepperContext.Provider>
  );
};

export { FormStepperContext, FormStepperProvider };

// add a function
// compares the steps list
// order it
// into the stepper form, it would also know which step is first or next based on sort order
// pass those values into that stepper form
// `useHook` that does this for us -- pass the data into it and it does all the steps for us
