
export type ReportType = 'lab' | 'radiology' | 'pathology' | 'consultation' | 'discharge' | 'other';

export interface MedicalReport {
  id: string;
  patientId: string;
  doctorId?: string;
  title: string;
  type: ReportType;
  fileUrl: string;
  originalText: string;
  summary: string;
  createdAt: string;
  keyInsights: {
    diagnosis: string[];
    treatments: string[];
    medications: string[];
    followUp: string;
  };
  isProcessing: boolean;
}

export interface ReportFilter {
  type?: ReportType;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  doctorId: string;
  title: string;
  description: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  medications: Medication[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  profilePicture?: string;
  lastVisit?: string;
  upcomingAppointment?: string;
}
