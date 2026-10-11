export type AppointmentStatus =
  | 'confirmed'
  | 'pending'
  | 'arrived'
  | 'in_chair'
  | 'completed'
  | 'cancelled';

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge?: number;
  treatment: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30 AM"
  durationMinutes: number;
  status: AppointmentStatus;
  chiefComplaint: string;
  isEmergency: boolean;
  isFirstVisit: boolean;
  createdAt: string;
  clinicalNotes?: ClinicalNote;
}

export interface ClinicalNote {
  id: string;
  appointmentId: string;
  patientName: string;
  date: string;
  toothNumber?: string;
  diagnosis: string;
  treatmentRendered: string;
  prescriptions: string[];
  nextVisit?: string;
  estimatedCost?: number;
  paymentStatus?: 'paid' | 'partial' | 'pending';
  doctorRemarks?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'operatory' | 'technology' | 'reception' | 'sterilization';
  categoryLabel: string;
  imageUrl: string;
  description: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  duration: string;
  priceEstimate: string;
  benefits: string[];
  recommendedFor: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  reviewText: string;
  treatment: string;
  verified: boolean;
}

export interface DoctorCredentials {
  username: string;
  passwordHash: string; // stored credentials
  doctorName: string;
  title: string;
  email: string;
  phone: string;
  googleCalendarSyncEmail: string;
  clinicAddress: string;
  lastUpdated: string;
}

export interface ClinicScheduleSettings {
  morningStart: string; // "10:00"
  morningEnd: string; // "14:00"
  eveningStart: string; // "17:00"
  eveningEnd: string; // "21:30"
  slotDurationMinutes: number; // 30
  sundayOpen: boolean;
  sundayStart: string; // "10:00"
  sundayEnd: string; // "13:00"
  blockedDates: string[]; // ['2026-10-20']
  blockedSlots: { date: string; time: string }[];
}
