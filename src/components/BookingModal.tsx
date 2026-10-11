import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  MessageCircle,
  Phone,
  Printer,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { DENTAL_SERVICES } from '../data/mockData';
import { Appointment, ClinicScheduleSettings, DoctorCredentials } from '../types';
import {
  downloadIcsCalendarFile,
  generateGoogleCalendarUrl,
  generateWhatsAppReminderUrl,
} from '../utils/calendar';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (appointment: Appointment) => void;
  credentials: DoctorCredentials;
  scheduleSettings: ClinicScheduleSettings;
  existingAppointments: Appointment[];
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
  credentials,
  scheduleSettings,
  existingAppointments,
  preselectedService,
}) => {
  const [selectedService, setSelectedService] = useState<string>(
    preselectedService || DENTAL_SERVICES[0].title
  );

  // Default to today or tomorrow
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('');
  const [chiefComplaint, setChiefComplaint] = useState<string>('');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);

  // Submission state
  const [confirmedAppointment, setConfirmedAppointment] =
    useState<Appointment | null>(null);
  const [formError, setFormError] = useState<string>('');

  if (!isOpen) return null;

  // Generate date options for the next 14 days
  const dateOptions: { label: string; dateStr: string; isSunday: boolean }[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const isSunday = d.getDay() === 0;
    const isToday = i === 0;
    const isTomorrow = i === 1;

    let dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    let label = isToday
      ? 'Today'
      : isTomorrow
      ? 'Tomorrow'
      : `${dayName}, ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

    dateOptions.push({ label, dateStr, isSunday });
  }

  // Available slots logic based on date and schedule
  const selectedDateObj = new Date(selectedDate);
  const isSunday = selectedDateObj.getDay() === 0;

  const morningSlots = [
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '01:00 PM',
    '01:30 PM',
  ];

  const eveningSlots = isSunday
    ? [] // Sunday is morning only at clinic
    : [
        '05:00 PM',
        '05:30 PM',
        '06:00 PM',
        '06:30 PM',
        '07:00 PM',
        '07:30 PM',
        '08:00 PM',
        '08:30 PM',
        '09:00 PM',
      ];

  const isSlotBooked = (time: string) => {
    return existingAppointments.some(
      (a) =>
        a.date === selectedDate &&
        a.timeSlot === time &&
        a.status !== 'cancelled'
    );
  };

  const isDateBlocked = scheduleSettings.blockedDates.includes(selectedDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!patientName.trim()) {
      setFormError('Please enter the patient full name.');
      return;
    }

    if (!patientPhone.trim() || patientPhone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (isDateBlocked) {
      setFormError('Selected date is temporarily unavailable. Please choose another date.');
      return;
    }

    if (isSlotBooked(selectedTimeSlot)) {
      setFormError('This time slot is already booked. Please choose another slot.');
      return;
    }

    const newAppointment: Appointment = {
      id: `FDC-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim() || 'patient@familydental.com',
      patientAge: patientAge ? parseInt(patientAge, 10) : undefined,
      treatment: selectedService,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      durationMinutes: 45,
      status: 'confirmed',
      chiefComplaint: chiefComplaint.trim() || 'Routine dental checkup',
      isEmergency,
      isFirstVisit,
      createdAt: new Date().toISOString(),
    };

    onBookAppointment(newAppointment);
    setConfirmedAppointment(newAppointment);
  };

  const handleResetAndClose = () => {
    setConfirmedAppointment(null);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setChiefComplaint('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">Schedule Dental Appointment</h3>
              <p className="text-xs text-slate-400">
                Family Dental Care · {credentials.doctorName}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {confirmedAppointment ? (
            /* Post-Booking Success & Calendar Sync View */
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  We look forward to seeing you!
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Booking Reference: <strong className="text-slate-900 font-mono">{confirmedAppointment.id}</strong>
                </p>
              </div>

              {/* Appointment summary receipt */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left space-y-3">
                <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">Patient Name</span>
                    <strong className="text-slate-900">{confirmedAppointment.patientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Contact Number</span>
                    <strong className="text-slate-900">{confirmedAppointment.patientPhone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Date & Time</span>
                    <strong className="text-teal-800 font-semibold">
                      {confirmedAppointment.date} at {confirmedAppointment.timeSlot}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Treatment</span>
                    <strong className="text-slate-900">{confirmedAppointment.treatment}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Clinic Location:</span> {credentials.clinicAddress}
                </div>
              </div>

              {/* Google Calendar & Reminder Actions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Add to Calendar & Save Reminders
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Google Calendar 1-Click Sync */}
                  <a
                    href={generateGoogleCalendarUrl(confirmedAppointment, credentials)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all group"
                  >
                    <Calendar className="w-4 h-4 text-blue-200" />
                    <span>Add to Google Calendar</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  </a>

                  {/* Native iCal / Apple / Outlook Download */}
                  <button
                    onClick={() => downloadIcsCalendarFile(confirmedAppointment, credentials)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <Download className="w-4 h-4 text-slate-300" />
                    <span>Download .ICS Calendar</span>
                  </button>
                </div>

                <div className="pt-2">
                  <a
                    href={generateWhatsAppReminderUrl(confirmedAppointment, credentials, 'confirmation')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-200" />
                    <span>Open WhatsApp Booking Slip & Reminder</span>
                  </a>
                </div>
              </div>

              {/* Done button */}
              <div className="pt-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Done & Return to Website
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form Flow */
            <form onSubmit={handleSubmit} className="space-y-6">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Step 1: Treatment Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  1. Select Treatment / Concern
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                >
                  {DENTAL_SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} ({s.duration} · {s.priceEstimate})
                    </option>
                  ))}
                  <option value="General Consultation & Checkup">
                    General Dental Consultation & Checkup (₹300 - ₹500)
                  </option>
                  <option value="Emergency Tooth Pain Relief">
                    Emergency Tooth Pain Relief
                  </option>
                </select>
              </div>

              {/* Step 2: Date Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  2. Choose Preferred Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {dateOptions.slice(0, 8).map((opt) => (
                    <button
                      key={opt.dateStr}
                      type="button"
                      onClick={() => {
                        setSelectedDate(opt.dateStr);
                        // If switching to Sunday and current slot is in evening, reset to morning slot
                        if (opt.isSunday && selectedTimeSlot.includes('PM') && parseInt(selectedTimeSlot) >= 5) {
                          setSelectedTimeSlot('10:30 AM');
                        }
                      }}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        selectedDate === opt.dateStr
                          ? 'bg-teal-50 border-teal-600 text-teal-900 ring-1 ring-teal-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{opt.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {opt.isSunday ? 'Morning Only' : 'Morning & Eve'}
                      </div>
                    </button>
                  ))}
                </div>

                {isDateBlocked && (
                  <p className="text-xs text-amber-700 mt-2 font-medium">
                    ⚠️ Doctor is on leave or unavailable on this date. Please pick another date.
                  </p>
                )}
              </div>

              {/* Step 3: Time Slot Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  3. Select Time Slot
                </label>

                {/* Morning Slots */}
                <div className="mb-3">
                  <div className="text-[11px] font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-teal-600" />
                    <span>Morning Session (10:00 AM – 02:00 PM)</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {morningSlots.map((slot) => {
                      const booked = isSlotBooked(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={booked}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                            booked
                              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed line-through'
                              : selectedTimeSlot === slot
                              ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-700'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evening Slots (if not Sunday) */}
                {!isSunday ? (
                  <div>
                    <div className="text-[11px] font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-600" />
                      <span>Evening Session (05:00 PM – 09:30 PM)</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {eveningSlots.map((slot) => {
                        const booked = isSlotBooked(slot);
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={booked}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                              booked
                                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed line-through'
                                : selectedTimeSlot === slot
                                ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-700'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    ℹ️ Sunday evenings are reserved for sterilizer maintenance. Morning appointments only.
                  </p>
                )}
              </div>

              {/* Step 4: Patient Details */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  4. Patient Contact Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98201 23456"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address (For Calendar Invites)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@gmail.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Age (Optional)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 32"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Chief Complaint / Specific Symptoms
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe tooth pain, swelling, sensitivity, bleeding gums, or desired cosmetic correction..."
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEmergency}
                      onChange={(e) => setIsEmergency(e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                    />
                    <span className="text-rose-700 font-semibold">
                      Urgent Emergency / Severe Acute Pain
                    </span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFirstVisit}
                      onChange={(e) => setIsFirstVisit(e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                    />
                    <span>First visit to Family Dental Care</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/25 transition-all"
                >
                  Confirm & Sync with Google Calendar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
