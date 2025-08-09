import { createContext, useState, ReactNode, useContext } from 'react';
import { Individual } from '@/lib/types/Individual';
import { Plan } from '@/lib/types/Plan';

interface SelectedContextValue {
    currentIndividual: Individual | null;
    setCurrentIndividual: (ind: Individual | null) => void;

    currentPlan: Plan | null;
    setCurrentPlan: (plan: Plan | null) => void;
}

const SelectedContext = createContext<SelectedContextValue>({
    currentIndividual: {} as Individual,
    setCurrentIndividual: () => {},
    currentPlan: {} as Plan,
    setCurrentPlan: () => {}
});

function SelectedProvider({ children }: { children: ReactNode }) {
    const [currentIndividual, setCurrentIndividual] = useState<Individual | null>(null);
    const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);

    return (
        <SelectedContext.Provider
            value={{
                currentIndividual,
                setCurrentIndividual,
                currentPlan,
                setCurrentPlan
            }}
        >
            {children}
        </SelectedContext.Provider>
    )
}

function useSelected() {
    const ctx = useContext(SelectedContext);
    if (!ctx) {
        throw new Error('useSelected must be used within a SelectedProvider')
    }
    return ctx;
}

export { SelectedContext, SelectedProvider, useSelected }