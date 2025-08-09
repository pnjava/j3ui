export interface ReferralReport {
  patient_name: string;
  program_name:string;
  parent_company_name:string;
  referral_date: string | null; 
  disposition_date: string; 
  denial_reason: string;
  admission_date:string
  admitted: boolean;
  discharge_diversion: string;
  notes: string;
  ctsConsult: boolean;
  discharge_date: string | null;
  adult_geriatric: string;
  dementia: string;
  readmission_date: string | null;
  transition_placement: string;
  days_from_admission_date: () => number | null;
}

export interface ProgramOption {
  capacity: number
  created_by: string
  created_date: string
  end_date: string
  last_updated_by: string
  last_updated_date: string
  parent_program: string
  program_name: string
  program_type: string
  start_date: string
}