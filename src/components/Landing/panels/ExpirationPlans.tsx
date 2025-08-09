import BasePanel from "./BasePanel";
import PatientCard from "./PatientCard";

const ExpirationPlans = () => (
  <BasePanel title="Plans close to expiration (5)">
    <div className="self-stretch justify-start items-center gap-4 inline-flex">

      <PatientCard 
        name="Patient name" 
        mrn="MRN ID" 
        planStatus="Ongoing Plan" 
        location="SWVMHI - Southwestern Virginia Mental Health Institute" 
        expirationDays={3}
      />

      <PatientCard 
        name="Patient name" 
        mrn="MRN ID" 
        planStatus="Ongoing Plan" 
        location="SWVMHI - Southwestern Virginia Mental Health Institute" 
        expirationDays={7}
      />

      <PatientCard 
        name="Patient name" 
        mrn="MRN ID" 
        planStatus="Ongoing Plan" 
        location="SWVMHI - Southwestern Virginia Mental Health Institute" 
        expirationDays={13}
      />

    </div>
  </BasePanel>
);

export default ExpirationPlans;
