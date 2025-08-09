export interface Individual {
    date_of_birth?(date_of_birth: any): string;
    fln?: any;
    facility?: string;
    admit_date?: string;
    discharge_date?: string;
    id: string;
    mrn: string;
    fin?: string;
    state_hospital?: string;
    state_hospital_admission_date?: string;
    state_hospital_discharge_date?: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    dob: string;
    legal_status?: string;

    created_at: string;
    created_by: string;
    last_updated_at: string;
    last_updated_by: string;
    deleted_at?: string;
    deleted_by?: string;
  }