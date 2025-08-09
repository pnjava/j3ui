import { createContext, ReactNode, useContext, useRef, useState } from "react";

interface CalculationContextValue {
  total: number;
  setValue: (key: string, value?: number) => void;
  valuesDict: Record<string, number>;
}

interface CalculationProviderProps {
  name?: string;
  title?: string;
  children: ReactNode;
}

const CalculationContext = createContext<CalculationContextValue>({
  total: 0,
  setValue: () => {},
  valuesDict: {},
});

const CalculationProvider = ({
  name,
  title,
  children,
}: CalculationProviderProps) => {
  const parentContext = useContext(CalculationContext);
  const valuesDict = useRef<Record<string, number>>({});
  const [total, setTotal] = useState<number>(0);

  const setParentValue = parentContext?.setValue;

  const setValue = (key: string, value?: number) => {
    if (
      [
        "behavioralInterventionAssaults",
        "behavioralInterventionDestruction",
        "behavioralInterventionStealing",
        "behavioralInterventionSelfInjury",
        "behavioralInterventionIntrusiveBehavior",
        "behavioralInterventionSuicide",
        "behavioralInterventionSexualAggression",
        "behavioralInterventionNonAggressive",
        "behavioralInterventionTantrums",
        "behavioralInterventionWandering",
        "behavioralInterventionSubstanceAbuse",
        "behavioralInterventionMaintenance",
        "potentialPlacementFacilityType"
      ].includes(key)
      ) {
      return;// don't add this to the sections total
    }
    valuesDict.current[key] = value || 0;
    const tot = Object.values(valuesDict.current).reduce(
      (prev, curr) => prev + curr
    );
    setTotal(tot);
    if (setParentValue && name) {
      setParentValue(name, tot);
    }
  };

  return (
    <CalculationContext.Provider
      value={{ total, setValue, valuesDict: valuesDict.current }}
    >
      {title && (
        <>
          <div>
            <div className="flex items-end justify-end">
              <div className="text-[#8c8e90] text-lg font-normal font-inter leading-7 mr-auto">
                {title}
              </div>
              <div className="text-[#3b3e40] text-lg font-normal font-inter leading-7">
                ${new Intl.NumberFormat("en-US").format(total as number)}
              </div>
            </div>
          </div>

          <div className="border-b border-slate-[#8c8e90] my-4"></div>
        </>
      )}
      {children}
    </CalculationContext.Provider>
  );
};

export { CalculationContext, CalculationProvider };
