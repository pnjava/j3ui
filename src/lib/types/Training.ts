export interface Training {
  id: string | number;
  title: string;
  trainerId: string;
  trainerName: string;
  programId: string;
  startDate: string;
  format: string;
  status: string;
  classType: string;
  rejectReason?: string;
  location?: string;
  isDeleted?: boolean;
}
