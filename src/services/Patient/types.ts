interface User {
  id: string;
  full_name: string;
}

interface Action {
  taken_on_date: string;
  taken_by_user: User;
}

interface Deleted {
  status: boolean;
  action: Action;
}

interface Created {
  timestamp: string;
  user: User;
}

interface Updated {
  timestamp: string;
  user: User;
}

interface MemoryCare {
  is_memory_care_placement: boolean;
  has_approval_by_dbhds_community_transition_specialist: boolean;
  dbhds_date_of_approval: string;
}

interface DischargeBarriers {
  dap_alternatives_attempted: string;
  other_outstanding_clinical_needs: string;
  dap_release_plan: string;
  residential_provider: string;
  memory_care: MemoryCare;
}

interface PatientResources {
  benefits_responsible_person: string;
  is_auxiliary_grant_eligible: boolean;
  is_id_dd: boolean;
  waiver_status_id: string;
  insurance_type: string;
  income: number;
  other_income: number;
}

export interface PatientRecord {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  mrn: string;
  csb_id: string;
  individual_id: string;
  facility_id: string;
  facility_name: string;
  clients_legal_status: string;
  age_group: string;
  requestor_name: string;
  date_of_request: string;
  plan_start_date: string;
  plan_end_date: string;
  type_of_funds: string;
  dc_readiness_level: string;
  description: string;
  patient_resources: PatientResources;
  discharge_barriers: DischargeBarriers;
  is_plan_modification: boolean;
  original_plan_amount: number;
  requested_amount: number;
  out_of_catchment: {
    is_out_of_catchment_plan: boolean;
    out_of_catchment_referral_completed: boolean;
    receiving_csb_dap_coordinator_consulted: boolean;
    csb_dap_coordinator_full_name: string;
    consultation_date: string;
    no_consultation_reason: string;
  };
  admission_date: string;
  hospital_admit_date: string;
  hospital_discharge_date: string;
  discharge_readiness_date: string;
  scheduled_discharge_date: string;
  transfer_due_date: string;
  residential_care_needed: string;
  elopement_risk: string;
  ambulation_equipment: string;
  exit_seeking_behaviors: string;
  cognitive_function: string;
  monitoring_device: string;
  diagnosis: string;
  mobility_level: string;
  major_neurocognitive_disorder: boolean;
  clinical_needs: string;
  regional_office_intake: {
    approved: boolean;
    date_received: string;
    date_approved: string;
    amount_needed_this_fiscal_year: number;
  };
  deleted: Deleted;
  created: Created;
  updated: Updated;
}

export interface CensusReferralRecord {
  id: string;
  patient_name:string;
  individual_id: string;
  referral_date:string
  discharge_date:string,
  census_individual:CensusIndividualRecord;
  created_by: string;
  adult_geriatric:string,
  program_name: string;
  parent_company_name: string;
  admission_date:string;
  discharge_diversion:string;
  disposition:string;
  disposition_date:string;
  denial_reason:string;
  notes:string;
  cts_consult:string;
  dementia:string;
  readmission_date:string;
  transition_placement:string;
  last_updated_at:string;
  created_at:string;
  last_updated_by:string;
}
export interface CensusIndividualRecord {
  facility: any;
  [x: string]: any;
  date_of_birth: string;
  empi: string;
  adult_geriatric: string;
  discharge_date: string;
  id: string;
  mrn: string;
  fin?: string;
  state_hospital?: string;
  state_hospital_admission_date?: string;
  state_hospital_discharge_date?: string;
  first_name?: string;
  middle_name?: string;
  last_name: string;
  dob?: string;
  legal_status?: string;

  created_at: string;
  created_by: string;
  last_updated_at: string;
  last_updated_by: string;
}
