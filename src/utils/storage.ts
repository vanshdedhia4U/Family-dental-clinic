import {
  Appointment,
  ClinicScheduleSettings,
  ClinicalNote,
  DoctorCredentials,
} from '../types';
import {
  INITIAL_APPOINTMENTS,
  INITIAL_DOCTOR_CREDENTIALS,
  INITIAL_SCHEDULE_SETTINGS,
} from '../data/mockData';

const APPOINTMENTS_KEY = 'fdc_appointments_v1';
const CREDENTIALS_KEY = 'fdc_credentials_v1';
const SCHEDULE_KEY = 'fdc_schedule_settings_v1';

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (!raw) {
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading appointments from storage:', err);
    return INITIAL_APPOINTMENTS;
  }
}

export function saveAppointments(appointments: Appointment[]): void {
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  } catch (err) {
    console.error('Error saving appointments to storage:', err);
  }
}

export function addAppointment(newAppt: Appointment): Appointment[] {
  const current = getStoredAppointments();
  const updated = [newAppt, ...current];
  saveAppointments(updated);
  return updated;
}

export function updateAppointmentStatus(
  id: string,
  status: Appointment['status']
): Appointment[] {
  const current = getStoredAppointments();
  const updated = current.map((a) => (a.id === id ? { ...a, status } : a));
  saveAppointments(updated);
  return updated;
}

export function saveClinicalNote(note: ClinicalNote): Appointment[] {
  const current = getStoredAppointments();
  const updated: Appointment[] = current.map((a) => {
    if (a.id === note.appointmentId) {
      return {
        ...a,
        clinicalNotes: note,
        status: (a.status === 'completed' ? 'completed' : a.status) as Appointment['status'],
      };
    }
    return a;
  });
  saveAppointments(updated);
  return updated;
}

export function getDoctorCredentials(): DoctorCredentials {
  try {
    const raw = localStorage.getItem(CREDENTIALS_KEY);
    if (!raw) {
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(INITIAL_DOCTOR_CREDENTIALS));
      return INITIAL_DOCTOR_CREDENTIALS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading credentials:', err);
    return INITIAL_DOCTOR_CREDENTIALS;
  }
}

export function saveDoctorCredentials(creds: DoctorCredentials): void {
  try {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
  } catch (err) {
    console.error('Error saving credentials:', err);
  }
}

export function getScheduleSettings(): ClinicScheduleSettings {
  try {
    const raw = localStorage.getItem(SCHEDULE_KEY);
    if (!raw) {
      localStorage.setItem(SCHEDULE_KEY, JSON.stringify(INITIAL_SCHEDULE_SETTINGS));
      return INITIAL_SCHEDULE_SETTINGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading schedule settings:', err);
    return INITIAL_SCHEDULE_SETTINGS;
  }
}

export function saveScheduleSettings(settings: ClinicScheduleSettings): void {
  try {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving schedule settings:', err);
  }
}
