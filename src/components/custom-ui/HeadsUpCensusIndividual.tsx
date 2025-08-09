import { CensusIndividualRecord } from "../../services/Patient/types";

interface HeadsUpCensusIndividualProps {
    individual: CensusIndividualRecord;
}

export const HeadsUpCensusIndividual: React.FC<HeadsUpCensusIndividualProps> = ({ individual }) => {
    return (
        <div>
        <div className="grid gap-4 p-4 bg-gray-50 rounded border border-gray-200">
            <div className="grid gap-2 md:grid-cols-6">
                <div>
                    <p className="text-sm text-[#94A3B8] font-semibold">MRN</p>
                    <p className="text-base">{individual.mrn}</p>
                </div>
                <div>
                    <p className="text-sm text-[#94A3B8] font-semibold">First name</p>
                    <p className="text-base">{individual.first_name}</p>
                </div>
                <div>
                    <p className="text-sm text-[#94A3B8] font-semibold">Middle name</p>
                    <p className="text-base">{individual.middle_name}</p>
                </div>
                <div>
                    <p className="text-sm text-[#94A3B8] font-semibold">Last name</p>
                    <p className="text-base">{individual.last_name}</p>
                </div>
                <div>
                    <p className="text-sm text-[#94A3B8] font-semibold">Legal status</p>
                    <p className="text-base">{individual.legal_status || "N/A"}</p>
                </div>
                <div>
                    <p className="text-sm text-[#94A3B8] font-semibold">Age group</p>
                    <p className="text-base">{
                        new Date().getFullYear() - new Date(individual.dob!).getFullYear() > 65
                        ? 'Geriatric' : 'Adult'
                    }</p>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-2">
            
            </div>
        </div>
        </div>
    )
}