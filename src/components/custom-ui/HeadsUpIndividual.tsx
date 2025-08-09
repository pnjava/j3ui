import { Individual } from "@/lib/types/Individual";

interface HeadsUpIndividualProps {
    individual: Individual;
}

export const HeadsUpIndividual: React.FC<HeadsUpIndividualProps> = ({ individual }) => {
    return (
        <div>
            <div className="grid gap-4 p-4 bg-gray-50 rounded border border-gray-200">
                {/* First Row: 5 Columns */}
                <div className="grid gap-2 md:grid-cols-5">
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
                        <p className="text-sm text-[#94A3B8] font-semibold">Age group</p>
                        <p className="text-base">{
                            new Date().getFullYear() - new Date(individual.dob!).getFullYear() > 65
                                ? 'Geriatric' : 'Adult'
                        }</p>
                    </div>
                </div>


                {/* Second Row: 4 Columns */}
                <div className="grid md:grid-cols-5 gap-2">
                    <div className="md:col-span-2">
                        <p className="text-sm text-[#94A3B8] font-semibold">Client's legal status</p>
                        <p className="text-base">{individual.legal_status || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#94A3B8] font-semibold">Facility name</p>
                        <p className="text-base">{individual.state_hospital}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#94A3B8] font-semibold">Hospital admit date</p>
                        <p className="text-base">{individual.state_hospital_admission_date}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#94A3B8] font-semibold">Hospital discharge date</p>
                        <p className="text-base">{individual.state_hospital_discharge_date}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
