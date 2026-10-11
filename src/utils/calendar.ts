import { Appointment, DoctorCredentials } from '../types';

/**
 * Format a date string (YYYY-MM-DD) and time slot ("10:30 AM") into ISO string or Google Calendar format (YYYYMMDDTHHmmSSZ)
 */
export function parseDateTime(dateStr: string, timeSlotStr: string): { start: Date; end: Date } {
  // timeSlotStr format: e.g. "10:30 AM" or "05:00 PM"
  const [timePart, modifier] = timeSlotStr.split(' ');
  const [hoursStr, minutesStr] = timePart.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (modifier?.toUpperCase() === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier?.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  const [year, month, day] = dateStr.split('-').map(Number);
  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(startDate.getTime() + 45 * 60 * 1000); // Default 45 mins

  return { start: startDate, end: endDate };
}

function formatGoogleDate(date: Date): string {
  // YYYYMMDDTHHmmssZ
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Creates a direct 1-click Google Calendar Event link for the patient or clinic
 */
export function generateGoogleCalendarUrl(
  appointment: Appointment,
  clinic: DoctorCredentials
): string {
  const { start, end } = parseDateTime(appointment.date, appointment.timeSlot);
  const dates = `${formatGoogleDate(start)}/${formatGoogleDate(end)}`;

  const title = encodeURIComponent(
    `Dental Appointment: ${appointment.treatment} with ${clinic.doctorName}`
  );

  const detailsText = [
    `🦷 Clinic: Family Dental Care Multispeciality Dental Clinic`,
    `👨‍⚕️ Doctor: ${clinic.doctorName} (${clinic.title})`,
    `📋 Treatment: ${appointment.treatment}`,
    `👤 Patient: ${appointment.patientName} (${appointment.patientPhone})`,
    `📝 Chief Complaint: ${appointment.chiefComplaint || 'Routine examination'}`,
    `📍 Address: ${clinic.clinicAddress}`,
    `📞 Phone: ${clinic.phone}`,
    ``,
    `⏰ Patient Instructions:`,
    `- Please arrive 10 minutes prior to your scheduled time.`,
    `- Carry prior dental X-rays or ongoing medication prescriptions if any.`,
    `- Emergency or rescheduling: Call ${clinic.phone}`,
  ].join('\n');

  const details = encodeURIComponent(detailsText);
  const location = encodeURIComponent(
    `Family Dental Care, 1st Floor, Above City Medical, Chinchpada Chowk, Ambernath West, Maharashtra 421501`
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
}

/**
 * Generate .ics iCalendar file for native Apple Calendar / Outlook / Google Calendar
 */
export function downloadIcsCalendarFile(
  appointment: Appointment,
  clinic: DoctorCredentials
): void {
  const { start, end } = parseDateTime(appointment.date, appointment.timeSlot);
  const formatIcsDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const summary = `Dental Visit: ${appointment.treatment} - ${clinic.doctorName}`;
  const description = `Patient: ${appointment.patientName}\\nTreatment: ${appointment.treatment}\\nClinic: Family Dental Care\\nPhone: ${clinic.phone}\\nAddress: ${clinic.clinicAddress}`;
  const location = `${clinic.clinicAddress}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Family Dental Care//Appointment System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${appointment.id}-${Date.now()}@familydentalcare.com`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Dental Appointment Reminder in 2 Hours',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Dental Appointment Tomorrow at Family Dental Care',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `FamilyDentalCare_Appointment_${appointment.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generate prefilled WhatsApp reminder link
 */
export function generateWhatsAppReminderUrl(
  appointment: Appointment,
  clinic: DoctorCredentials,
  reminderType: 'confirmation' | 'upcoming_today' | 'upcoming_tomorrow' = 'confirmation'
): string {
  // Format phone number to clean international format (India: +91)
  let cleanPhone = appointment.patientPhone.replace(/\D/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }

  let text = '';
  if (reminderType === 'confirmation') {
    text = `Hello ${appointment.patientName}, your dental appointment with ${clinic.doctorName} at Family Dental Care is CONFIRMED!\n\n📅 Date: ${appointment.date}\n⏰ Time: ${appointment.timeSlot}\n🦷 Treatment: ${appointment.treatment}\n📍 Location: ${clinic.clinicAddress}\n📞 Contact: ${clinic.phone}\n\nAdd directly to your Google Calendar:\n${generateGoogleCalendarUrl(appointment, clinic)}\n\nSee you soon for a healthy, brighter smile!`;
  } else if (reminderType === 'upcoming_today') {
    text = `Reminder: Hello ${appointment.patientName}, you have a dental appointment TODAY at ${appointment.timeSlot} with ${clinic.doctorName} (Family Dental Care, Ambernath). Please arrive 5 minutes early. Call ${clinic.phone} for any queries.`;
  } else {
    text = `Friendly Reminder: Hello ${appointment.patientName}, you have a dental appointment scheduled TOMORROW (${appointment.date}) at ${appointment.timeSlot} with ${clinic.doctorName} at Family Dental Care. Need to reschedule? Please contact us at ${clinic.phone}.`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
