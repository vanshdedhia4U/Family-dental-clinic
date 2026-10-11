import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Edit,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  Trash2,
  User,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  Appointment,
  ClinicScheduleSettings,
  ClinicalNote,
  DoctorCredentials,
} from '../../types';
import {
  downloadIcsCalendarFile,
  generateGoogleCalendarUrl,
  generateWhatsAppReminderUrl,
} from '../../utils/calendar';
import { ClinicalNoteModal } from './ClinicalNoteModal';

interface DoctorDashboardProps {
  credentials: DoctorCredentials;
  appointments: Appointment[];
  scheduleSettings: ClinicScheduleSettings;
  onUpdateStatus: (id: string, status: Appointment['status']) => void;
  onSaveClinicalNote: (note: ClinicalNote) => void;
  onUpdateScheduleSettings: (settings: ClinicScheduleSettings) => void;
  onAddManualAppointment: (appointment: Appointment) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  credentials,
  appointments,
  scheduleSettings,
  onUpdateStatus,
  onSaveClinicalNote,
  onUpdateScheduleSettings,
  onAddManualAppointment,
  onLogout,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    'daily_visits' | 'all_appointments' | 'clinical_notes' | 'schedule' | 'reminders' | 'gcal'
  >('daily_visits');

  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'today' | 'tomorrow' | 'upcoming' | 'all'>('today');
  const [selectedAppointmentForNote, setSelectedAppointmentForNote] =
    useState<Appointment | null>(null);

  // Manual Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newTreatment, setNewTreatment] = useState('General Consultation & Checkup');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('11:00 AM');
  const [newComplaint, setNewComplaint] = useState('');

  // Date utilities
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Filtered lists
  const todayAppointments = appointments.filter((a) => a.date === todayStr);
  const tomorrowAppointments = appointments.filter((a) => a.date === tomorrowStr);

  const filteredAppointments = appointments.filter((a) => {
    // Date filter
    if (dateFilter === 'today' && a.date !== todayStr) return false;
    if (dateFilter === 'tomorrow' && a.date !== tomorrowStr) return false;
    if (dateFilter === 'upcoming' && a.date < todayStr) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = a.patientName.toLowerCase().includes(q);
      const matchPhone = a.patientPhone.includes(q);
      const matchTreatment = a.treatment.toLowerCase().includes(q);
      const matchId = a.id.toLowerCase().includes(q);
      return matchName || matchPhone || matchTreatment || matchId;
    }
    return true;
  });

  // Today metrics
  const totalToday = todayAppointments.length;
  const arrivedOrWaiting = todayAppointments.filter((a) => a.status === 'arrived').length;
  const inOperatory = todayAppointments.filter((a) => a.status === 'in_chair').length;
  const completedToday = todayAppointments.filter((a) => a.status === 'completed').length;
  const emergenciesToday = todayAppointments.filter((a) => a.isEmergency).length;

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim() || !newPatientPhone.trim()) return;

    const newAppt: Appointment = {
      id: `FDC-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: newPatientName.trim(),
      patientPhone: newPatientPhone.trim(),
      patientEmail: 'walkin@familydental.com',
      treatment: newTreatment,
      date: newDate,
      timeSlot: newTime,
      durationMinutes: 30,
      status: 'confirmed',
      chiefComplaint: newComplaint.trim() || 'Walk-in consultation',
      isEmergency: false,
      isFirstVisit: true,
      createdAt: new Date().toISOString(),
    };

    onAddManualAppointment(newAppt);
    setIsAddModalOpen(false);
    setNewPatientName('');
    setNewPatientPhone('');
    setNewComplaint('');
  };

  const handleToggleBlockDate = (dateToToggle: string) => {
    const isBlocked = scheduleSettings.blockedDates.includes(dateToToggle);
    const updated = isBlocked
      ? scheduleSettings.blockedDates.filter((d) => d !== dateToToggle)
      : [...scheduleSettings.blockedDates, dateToToggle];
    onUpdateScheduleSettings({
      ...scheduleSettings,
      blockedDates: updated,
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Clinic Admin Navigation Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base tracking-tight text-white">
                  Family Dental Care · Doctor Portal
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-900 text-teal-300 border border-teal-700/60">
                  Doctor Schedule Management
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in as: <strong className="text-slate-200">{credentials.doctorName}</strong> ({credentials.title})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Walk-In Patient</span>
            </button>

            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              Exit to Website
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 text-xs font-semibold transition-colors"
              title="Logout from Doctor Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-800/80 flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveTab('daily_visits')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'daily_visits'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Today's Daily Visits ({totalToday})</span>
          </button>

          <button
            onClick={() => setActiveTab('all_appointments')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'all_appointments'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>All Appointments ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clinical_notes')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'clinical_notes'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Clinical Notes & Dental Records</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'schedule'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Clinic Hours & Block Dates</span>
          </button>

          <button
            onClick={() => setActiveTab('reminders')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'reminders'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Patient Reminders Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('gcal')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'gcal'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Google Calendar Sync</span>
          </button>
        </div>
      </header>

      {/* Main Content Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Today's Visits</span>
              <Clock className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{totalToday}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Scheduled for {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">In Waiting / Arrived</span>
              <UserCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-amber-700">{arrivedOrWaiting}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Patients at reception</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">In Operatory Chair</span>
              <Stethoscope className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-2xl font-extrabold text-cyan-700">{inOperatory}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Active treatment</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Completed Today</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-700">{completedToday}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Visits finished</div>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-1 bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider">Tomorrow's Queue</span>
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-blue-700">{tomorrowAppointments.length}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Upcoming appointments</div>
          </div>
        </div>

        {/* TAB 1: TODAY'S DAILY VISITS */}
        {activeTab === 'daily_visits' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Today's Clinical Schedule ({new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })})
                </h2>
                <p className="text-xs text-slate-500">
                  Track patient arrival, update chair status, write clinical notes, and manage schedule directly.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    `Family Dental Care OPD: ${todayAppointments.length} Visits Today`
                  )}&details=${encodeURIComponent(
                    todayAppointments
                      .map((a) => `${a.timeSlot}: ${a.patientName} (${a.treatment})`)
                      .join('\n')
                  )}&location=${encodeURIComponent(credentials.clinicAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Sync Today's OPD to Google Calendar</span>
                </a>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Patient</span>
                </button>
              </div>
            </div>

            {todayAppointments.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 text-base">No appointments scheduled for today</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Patients booking online will appear here automatically. You can also add walk-ins directly.
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700"
                >
                  Add Walk-In Patient
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5">
                {todayAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className={`bg-white rounded-xl p-5 border transition-all shadow-sm ${
                      appt.status === 'in_chair'
                        ? 'border-cyan-400 ring-2 ring-cyan-100'
                        : appt.status === 'arrived'
                        ? 'border-amber-300 ring-2 ring-amber-50'
                        : appt.status === 'completed'
                        ? 'border-slate-200 opacity-90'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Patient Info & Timing */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                            {appt.timeSlot}
                          </span>
                          <span className="text-slate-400">·</span>
                          <h3 className="font-bold text-base text-slate-900">{appt.patientName}</h3>
                          {appt.patientAge && (
                            <span className="text-xs text-slate-500 font-medium">
                              ({appt.patientAge} yrs)
                            </span>
                          )}
                          {appt.isEmergency && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase tracking-wide">
                              Emergency
                            </span>
                          )}
                          <span className="text-xs text-slate-400 font-mono">[{appt.id}]</span>
                        </div>

                        <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                          <span className="font-semibold text-teal-800">{appt.treatment}</span>
                          <span>·</span>
                          <a
                            href={`tel:${appt.patientPhone.replace(/\s+/g, '')}`}
                            className="text-slate-700 hover:text-teal-700 flex items-center gap-1 font-medium"
                          >
                            <Phone className="w-3 h-3 text-slate-400" />
                            {appt.patientPhone}
                          </a>
                        </div>

                        {appt.chiefComplaint && (
                          <p className="text-xs text-slate-600 italic bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                            <strong className="text-slate-700 not-italic">Chief Complaint:</strong>{' '}
                            {appt.chiefComplaint}
                          </p>
                        )}

                        {/* Existing clinical note preview badge */}
                        {appt.clinicalNotes && (
                          <div className="flex items-center gap-2 text-xs text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              <strong>Tooth {appt.clinicalNotes.toothNumber || 'Examined'}:</strong>{' '}
                              {appt.clinicalNotes.diagnosis} · {appt.clinicalNotes.treatmentRendered.slice(0, 50)}...
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Status Switcher & Actions */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {/* Status dropdown */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Status:</span>
                          <select
                            value={appt.status}
                            onChange={(e) =>
                              onUpdateStatus(appt.id, e.target.value as Appointment['status'])
                            }
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg border focus:outline-none ${
                              appt.status === 'confirmed'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : appt.status === 'arrived'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : appt.status === 'in_chair'
                                ? 'bg-cyan-50 text-cyan-800 border-cyan-300'
                                : appt.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="arrived">Arrived (Waiting)</option>
                            <option value="in_chair">In Operatory Chair</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        {/* Clinical Note button */}
                        <button
                          onClick={() => setSelectedAppointmentForNote(appt)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            appt.clinicalNotes
                              ? 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{appt.clinicalNotes ? 'View/Edit Notes' : '+ Clinical Note'}</span>
                        </button>

                        {/* WhatsApp reminder trigger */}
                        <a
                          href={generateWhatsAppReminderUrl(appt, credentials, 'upcoming_today')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold"
                          title="Send instant WhatsApp visit reminder"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>

                        {/* 1-Click Google Calendar */}
                        <a
                          href={generateGoogleCalendarUrl(appt, credentials)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                          title="Add individual event to Google Calendar"
                        >
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ALL APPOINTMENTS & MASTER SCHEDULE */}
        {activeTab === 'all_appointments' && (
          <div className="space-y-4">
            {/* Filter toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by patient, phone, ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                <button
                  onClick={() => setDateFilter('today')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    dateFilter === 'today'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Today ({todayAppointments.length})
                </button>
                <button
                  onClick={() => setDateFilter('tomorrow')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    dateFilter === 'tomorrow'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tomorrow ({tomorrowAppointments.length})
                </button>
                <button
                  onClick={() => setDateFilter('upcoming')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    dateFilter === 'upcoming'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Upcoming
                </button>
                <button
                  onClick={() => setDateFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    dateFilter === 'all'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Records ({appointments.length})
                </button>
              </div>
            </div>

            {/* Table / List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Ref / Time</th>
                      <th className="py-3 px-4">Patient Name</th>
                      <th className="py-3 px-4">Phone / Contact</th>
                      <th className="py-3 px-4">Treatment</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No matching appointments found.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((a) => (
                        <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-mono font-bold text-slate-900">{a.timeSlot}</div>
                            <div className="text-[10px] text-slate-500">{a.date} · {a.id}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900">{a.patientName}</div>
                            {a.patientAge && (
                              <div className="text-[10px] text-slate-500">{a.patientAge} years</div>
                            )}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-700">
                            {a.patientPhone}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-teal-800">{a.treatment}</div>
                            {a.chiefComplaint && (
                              <div className="text-[10px] text-slate-500 truncate max-w-xs">
                                {a.chiefComplaint}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <select
                              value={a.status}
                              onChange={(e) =>
                                onUpdateStatus(a.id, e.target.value as Appointment['status'])
                              }
                              className="px-2 py-1 text-xs font-semibold rounded border border-slate-300 focus:outline-none"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="arrived">Arrived</option>
                              <option value="in_chair">In Chair</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                            <button
                              onClick={() => setSelectedAppointmentForNote(a)}
                              className="px-2.5 py-1 rounded bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 font-semibold"
                            >
                              {a.clinicalNotes ? 'Notes ✓' : '+ Note'}
                            </button>
                            <a
                              href={generateGoogleCalendarUrl(a, credentials)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block p-1 rounded hover:bg-slate-100 text-blue-600"
                              title="Sync to Google Calendar"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CLINICAL NOTES & DENTAL RECORDS */}
        {activeTab === 'clinical_notes' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Patient Clinical Records & Diagnoses</h2>
                <p className="text-xs text-slate-500">
                  Detailed operative records, tooth notations, prescriptions, and follow-up schedules.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments
                .filter((a) => a.clinicalNotes)
                .map((a) => {
                  const note = a.clinicalNotes!;
                  return (
                    <div
                      key={note.id}
                      className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-slate-900">
                              {note.patientName}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-50 text-teal-700 border border-teal-200 font-bold">
                              {note.toothNumber || 'General'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Visit Date: {note.date} · Ref: {a.id}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedAppointmentForNote(a)}
                          className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </div>

                      <div className="text-xs space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div>
                          <strong className="text-slate-700 block">Diagnosis:</strong>
                          <span className="text-slate-600">{note.diagnosis}</span>
                        </div>
                        <div>
                          <strong className="text-slate-700 block">Procedure Rendered:</strong>
                          <span className="text-slate-600">{note.treatmentRendered}</span>
                        </div>
                        {note.prescriptions && note.prescriptions.length > 0 && (
                          <div>
                            <strong className="text-slate-700 block">Prescriptions:</strong>
                            <ul className="list-disc pl-4 text-slate-600 font-mono text-[11px] space-y-0.5 mt-0.5">
                              {note.prescriptions.map((p, idx) => (
                                <li key={idx}>{p}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div>
                          <span>Fee: </span>
                          <strong className="text-slate-900">₹{note.estimatedCost || '—'}</strong>
                          <span className="ml-1 uppercase text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                            {note.paymentStatus || 'Paid'}
                          </span>
                        </div>
                        {note.nextVisit && (
                          <div className="text-teal-700 font-medium">
                            Next visit: {note.nextVisit}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB 4: CLINIC SCHEDULE & AVAILABILITY */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Clinic Schedule & Shift Availability</h2>
              <p className="text-xs text-slate-500">
                Directly configure your clinic availability, block dates for emergency surgeries or holidays.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Working Hours Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Standard Shift Timings</span>
                </h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                    <span className="font-semibold">Morning Session (Mon-Sat):</span>
                    <span>10:00 AM – 02:00 PM</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                    <span className="font-semibold">Evening Session (Mon-Sat):</span>
                    <span>05:00 PM – 09:30 PM</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                    <span className="font-semibold">Sunday Session:</span>
                    <span>10:00 AM – 01:00 PM (Morning Only)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                    <span className="font-semibold">Standard Slot Duration:</span>
                    <span>30 - 45 Minutes</span>
                  </div>
                </div>
              </div>

              {/* Blocked Dates Manager */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Block Out Dates / Leave Days</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Patients will not be able to book appointments on blocked dates.
                </p>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="date"
                      id="blockDateInput"
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs flex-1 bg-white"
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('blockDateInput') as HTMLInputElement;
                        if (input && input.value) {
                          handleToggleBlockDate(input.value);
                          input.value = '';
                        }
                      }}
                      className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700"
                    >
                      Block Date
                    </button>
                  </div>

                  {scheduleSettings.blockedDates.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {scheduleSettings.blockedDates.map((d) => (
                        <span
                          key={d}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-100 text-rose-800 text-xs font-semibold"
                        >
                          <span>{d}</span>
                          <button
                            onClick={() => handleToggleBlockDate(d)}
                            className="hover:text-rose-950"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic pt-1">
                      No dates are currently blocked. Clinic is operating regular hours.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PATIENT REMINDERS HUB */}
        {activeTab === 'reminders' && (
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Patient Reminders & Notifications Hub</h2>
              <p className="text-xs text-slate-500">
                Automated reminders reduce missed appointments by 85%. Send instant WhatsApp or email reminders.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-slate-900">Pending Reminders for Today & Tomorrow</h3>
              <div className="divide-y divide-slate-100">
                {[...todayAppointments, ...tomorrowAppointments].map((appt) => {
                  const isTodayAppt = appt.date === todayStr;
                  return (
                    <div key={appt.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-slate-900">{appt.patientName}</strong>
                          <span className="text-xs text-slate-500">({appt.patientPhone})</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              isTodayAppt
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {isTodayAppt ? 'Today' : 'Tomorrow'} · {appt.timeSlot}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{appt.treatment}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={generateWhatsAppReminderUrl(
                            appt,
                            credentials,
                            isTodayAppt ? 'upcoming_today' : 'upcoming_tomorrow'
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Send WhatsApp Reminder</span>
                        </a>

                        <a
                          href={`mailto:${appt.patientEmail}?subject=${encodeURIComponent(
                            `Dental Appointment Reminder - Family Dental Care`
                          )}&body=${encodeURIComponent(
                            `Hello ${appt.patientName},\n\nThis is a reminder from Family Dental Care for your upcoming visit with Dr. Bhagyashree Jagtap.\n\nDate: ${appt.date}\nTime: ${appt.timeSlot}\nTreatment: ${appt.treatment}\nAddress: ${credentials.clinicAddress}\nPhone: ${credentials.phone}\n\nSee you soon!`
                          )}`}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: GOOGLE CALENDAR SYNC */}
        {activeTab === 'gcal' && (
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Google Calendar Synchronization</h2>
                <p className="text-xs text-slate-500">
                  Appointments booked on the website can be seamlessly synced with your clinic Google Calendar.
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Google Calendar Ready</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option 1: 1-Click Sync Today */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Sync Today's Schedule to Google Calendar</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Generates a full day's agenda event with all patient visit timings, treatments, and clinical notes.
                </p>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    `Family Dental Care - Daily OPD Schedule (${todayAppointments.length} Patients)`
                  )}&details=${encodeURIComponent(
                    todayAppointments
                      .map(
                        (a) =>
                          `⏰ ${a.timeSlot} | ${a.patientName} (${a.patientPhone}) | Treatment: ${a.treatment} | Notes: ${a.chiefComplaint}`
                      )
                      .join('\n\n')
                  )}&location=${encodeURIComponent(credentials.clinicAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Google Calendar Web / Mobile</span>
                </a>
              </div>

              {/* Option 2: Export iCal File */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-slate-700" />
                  <span>Download Full Calendar Data (.ICS)</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Export all clinic bookings into universal iCalendar format, compatible with Google Calendar, Apple Calendar, and Outlook.
                </p>
                <button
                  onClick={() => {
                    todayAppointments.forEach((a) => downloadIcsCalendarFile(a, credentials));
                  }}
                  className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Today's Visits (.ics)</span>
                </button>
              </div>
            </div>

            {/* Sync Email Information */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
              <strong>Clinic Google Account:</strong> {credentials.googleCalendarSyncEmail}
              <p className="text-blue-700">
                All patient confirmation emails include automatic Google Calendar invite links configured to this calendar ID.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Clinical Note Modal */}
      {selectedAppointmentForNote && (
        <ClinicalNoteModal
          isOpen={true}
          onClose={() => setSelectedAppointmentForNote(null)}
          appointment={selectedAppointmentForNote}
          onSaveNote={onSaveClinicalNote}
          credentials={credentials}
        />
      )}

      {/* Manual Walk-In Appointment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base">Add Walk-In Patient</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualAdd} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Mobile Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98200 00000"
                  value={newPatientPhone}
                  onChange={(e) => setNewPatientPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Treatment</label>
                <input
                  type="text"
                  value={newTreatment}
                  onChange={(e) => setNewTreatment(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="11:30 AM"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Chief Complaint</label>
                <textarea
                  rows={2}
                  value={newComplaint}
                  onChange={(e) => setNewComplaint(e.target.value)}
                  placeholder="Toothache, checkup, etc."
                  className="w-full px-3 py-2 border rounded-lg resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700"
                >
                  Save & Add to Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
