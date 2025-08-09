import { FileCheck, FileClock } from "lucide-react";
import StatusBadge from "../../custom-ui/StatusBadge";
import BasePanel from "./BasePanel";
import PatientCard from "./PatientCard";

const ReviewPlans = () => (
  <BasePanel title="For review (12)">
    <div className="self-stretch justify-start items-center gap-4 inline-flex flex-wrap">

        <PatientCard 
          name="Patient name" 
          mrn="MRN ID" 
          planStatus="Ongoing Plan" 
          location="SWVMHI - Southwestern Virginia Mental Health Institute" 
          statusBadge={<StatusBadge badgeColor="bg-[#b0d0e0]" status="Status" IconComponent={FileClock} />}
        />

        <PatientCard 
          name="Patient name" 
          mrn="MRN ID" 
          planStatus="Ongoing Plan" 
          location="SWVMHI - Southwestern Virginia Mental Health Institute" 
          statusBadge={<StatusBadge badgeColor="bg-[#d4e2c4]" status="Status" IconComponent={FileCheck} />}
        />

        <PatientCard 
          name="Patient name" 
          mrn="MRN ID" 
          planStatus="Ongoing Plan" 
          location="SWVMHI - Southwestern Virginia Mental Health Institute" 
          statusBadge={<StatusBadge badgeColor="bg-[#d4e2c4]" status="Status" IconComponent={FileCheck} />}
        />
        
    </div>
  </BasePanel>
);

export default ReviewPlans;
