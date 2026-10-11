import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Key,
  Lock,
  LogOut,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  X,
} from 'lucide-react';
import {
  Appointment,
  ClinicScheduleSettings,
  ClinicalNote,
  DoctorCredentials,
} from '../../types';
import { DoctorDashboard } from './DoctorDashboard';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  credentials: DoctorCredentials;
  onUpdateCredentials: (newCreds: DoctorCredentials) => void;
  appointments: Appointment[];
  scheduleSettings: ClinicScheduleSettings;
  onUpdateStatus: (id: string, status: Appointment['status']) => void;
  onSaveClinicalNote: (note: ClinicalNote) => void;
  onUpdateScheduleSettings: (settings: ClinicScheduleSettings) => void;
  onAddManualAppointment: (appointment: Appointment) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  credentials,
  onUpdateCredentials,
  appointments,
  scheduleSettings,
  onUpdateStatus,
  onSaveClinicalNote,
  onUpdateScheduleSettings,
  onAddManualAppointment,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  // Portal mode: 'doctor_login' or 'agency_credentials_config'
  const [activeView, setActiveView] = useState<'doctor_login' | 'agency_setup'>('doctor_login');

  // Login form state
  const [loginUsername, setLoginUsername] = useState(credentials.username);
  const [loginPassword, setLoginPassword] = useState(credentials.passwordHash);
  const [loginError, setLoginError] = useState('');

  // Agency credential configuration state
  const [clientUsername, setClientUsername] = useState(credentials.username);
  const [clientPassword, setClientPassword] = useState(credentials.passwordHash);
  const [doctorName, setDoctorName] = useState(credentials.doctorName);
  const [doctorTitle, setDoctorTitle] = useState(credentials.title);
  const [doctorEmail, setDoctorEmail] = useState(credentials.email);
  const [doctorPhone, setDoctorPhone] = useState(credentials.phone);
  const [gcalEmail, setGcalEmail] = useState(credentials.googleCalendarSyncEmail);
  const [clinicAddress, setClinicAddress] = useState(credentials.clinicAddress);
  const [credentialsSavedMsg, setCredentialsSavedMsg] = useState('');
  const [copiedInvite, setCopiedInvite] = useState(false);

  if (!isOpen) return null;

  // If already authenticated as the client/doctor, show the full Doctor Dashboard
  if (isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/90 backdrop-blur-md">
        <DoctorDashboard
          credentials={credentials}
          appointments={appointments}
          scheduleSettings={scheduleSettings}
          onUpdateStatus={onUpdateStatus}
          onSaveClinicalNote={onSaveClinicalNote}
          onUpdateScheduleSettings={onUpdateScheduleSettings}
          onAddManualAppointment={onAddManualAppointment}
          onLogout={() => setIsLoggedIn(false)}
          onClose={onClose}
        />
      </div>
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (
      loginUsername.trim().toLowerCase() === credentials.username.toLowerCase() &&
      loginPassword.trim() === credentials.passwordHash
    ) {
      setIsLoggedIn(true);
    } else {
      setLoginError(
        'Invalid username or password. Please verify the credentials configured in Agency Setup.'
      );
    }
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: DoctorCredentials = {
      username: clientUsername.trim(),
      passwordHash: clientPassword.trim(),
      doctorName: doctorName.trim(),
      title: doctorTitle.trim(),
      email: doctorEmail.trim(),
      phone: doctorPhone.trim(),
      googleCalendarSyncEmail: gcalEmail.trim(),
      clinicAddress: clinicAddress.trim(),
      lastUpdated: new Date().toISOString(),
    };

    onUpdateCredentials(updated);
    setLoginUsername(updated.username);
    setLoginPassword(updated.passwordHash);
    setCredentialsSavedMsg('Client login credentials successfully updated and saved!');

    setTimeout(() => {
      setCredentialsSavedMsg('');
    }, 3000);
  };

  const handleCopyClientInvite = () => {
    const inviteText = [
      `Hello ${doctorName},`,
      ``,
      `Here are your official login credentials for the Family Dental Care Practice Dashboard:`,
      `🌐 Portal: Open website and click "Doctor Portal" at the top right`,
      `👤 Username: ${clientUsername}`,
      `🔑 Password: ${clientPassword}`,
      `📅 Google Calendar Sync ID: ${gcalEmail}`,
      ``,
      `Once logged in, you can view all upcoming daily appointments, update chair statuses, add clinical notes, and manage your clinic schedule directly.`,
    ].join('\n');

    navigator.clipboard.writeText(inviteText);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">Portal Access Control</h3>
              <p className="text-xs text-slate-400">
                Family Dental Care Multispeciality Dental Clinic
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher Tabs: Client Login vs Agency Developer Setup */}
        <div className="bg-slate-100 p-1.5 border-b border-slate-200 flex">
          <button
            onClick={() => setActiveView('doctor_login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeView === 'doctor_login'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            <span>Client / Doctor Login ({credentials.doctorName})</span>
          </button>

          <button
            onClick={() => setActiveView('agency_setup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeView === 'agency_setup'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-amber-600" />
            <span>Developer / Agency Login Setup</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {activeView === 'doctor_login' ? (
            /* CLIENT / DOCTOR LOGIN VIEW */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 mx-auto flex items-center justify-center mb-2 shadow-inner">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Doctor Clinical Schedule Portal
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Secure sign-in for <strong className="text-slate-700">{credentials.doctorName}</strong>.
                  View scheduled visits, write clinical notes, and manage daily OPD hours.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Enter assigned doctor username"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                {/* Pre-fill helper badge */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500">Configured credentials:</span>
                    <div className="font-mono font-semibold text-slate-800">
                      User: {credentials.username} · Pass: {credentials.passwordHash}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginUsername(credentials.username);
                      setLoginPassword(credentials.passwordHash);
                    }}
                    className="px-2.5 py-1 rounded bg-teal-50 text-teal-700 border border-teal-200 font-semibold hover:bg-teal-100"
                  >
                    Quick Fill
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition-all"
                >
                  Enter Doctor Dashboard
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActiveView('agency_setup')}
                  className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4"
                >
                  Need to change or configure doctor login credentials? Switch to Agency Setup
                </button>
              </div>
            </div>
          ) : (
            /* DEVELOPER / AGENCY LOGIN SETUP VIEW */
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  Agency Setup View
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  Configure Client Login Details & Clinic Settings
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  You requested: <em>"Make an admin protal which I can only add the login details and my client can only see the appointments and manage their clinic schedule directly."</em> Set their credentials below.
                </p>
              </div>

              {credentialsSavedMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{credentialsSavedMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveCredentials} className="space-y-4 text-xs">
                {/* Login Credentials Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-600" />
                    <span>Client Login Credentials</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-medium text-slate-700 block mb-1">
                        Client Username *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientUsername}
                        onChange={(e) => setClientUsername(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-medium text-slate-700 block mb-1">
                        Client Password *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientPassword}
                        onChange={(e) => setClientPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Doctor Profile Info */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-600" />
                    <span>Dentist Client Profile</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-medium text-slate-700 block mb-1">
                        Doctor Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-medium text-slate-700 block mb-1">
                        Qualifications & Title
                      </label>
                      <input
                        type="text"
                        required
                        value={doctorTitle}
                        onChange={(e) => setDoctorTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-medium text-slate-700 block mb-1">
                        Clinic Contact Phone
                      </label>
                      <input
                        type="text"
                        required
                        value={doctorPhone}
                        onChange={(e) => setDoctorPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-medium text-slate-700 block mb-1">
                        Google Calendar Sync ID / Email
                      </label>
                      <input
                        type="email"
                        required
                        value={gcalEmail}
                        onChange={(e) => setGcalEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-medium text-slate-700 block mb-1">
                      Clinic Street Address
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={clinicAddress}
                      onChange={(e) => setClinicAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border bg-white resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyClientInvite}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                  >
                    {copiedInvite ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Credentials Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Login Details for Client</span>
                      </>
                    )}
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm transition-all text-center"
                  >
                    Save & Update Client Login Details
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
