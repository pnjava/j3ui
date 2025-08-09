import BasePanel from "./BasePanel";
import PatientCard from "./PatientCard";

const ApprovedPlans = () => (
  <BasePanel title="Approved Plans (8)">
    <div className="self-stretch justify-start items-center gap-4 inline-flex flex-wrap">

      <PatientCard 
        name="Patient name" 
        mrn="MRN ID" 
        planStatus="Ongoing Plan" 
        location="SWVMHI - Southwestern Virginia Mental Health Institute" 
      />

      <PatientCard 
        name="Patient name" 
        mrn="MRN ID" 
        planStatus="Ongoing Plan" 
        location="SWVMHI - Southwestern Virginia Mental Health Institute" 
      />

      <PatientCard 
        name="Patient name" 
        mrn="MRN ID" 
        planStatus="Ongoing Plan" 
        location="SWVMHI - Southwestern Virginia Mental Health Institute" 
      />

    </div>
  </BasePanel>
);

export default ApprovedPlans;