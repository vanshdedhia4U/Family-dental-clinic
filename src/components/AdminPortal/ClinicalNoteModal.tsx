import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Pill,
  Printer,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import { Appointment, ClinicalNote, DoctorCredentials } from '../../types';

interface ClinicalNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
  onSaveNote: (note: ClinicalNote) => void;
  credentials: DoctorCredentials;
}

export const ClinicalNoteModal: React.FC<ClinicalNoteModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onSaveNote,
  credentials,
}) => {
  const existingNote = appointment.clinicalNotes;

  const [toothNumber, setToothNumber] = useState(
    existingNote?.toothNumber || '#36 (Lower Left First Molar)'
  );
  const [diagnosis, setDiagnosis] = useState(
    existingNote?.diagnosis || appointment.chiefComplaint || ''
  );
  const [treatmentRendered, setTreatmentRendered] = useState(
    existingNote?.treatmentRendered || ''
  );
  const [prescriptionsText, setPrescriptionsText] = useState(
    existingNote?.prescriptions?.join('\n') ||
      'Tab. Augmentin 625mg (1-0-1 x 5 days)\nTab. Zerodol-SP (1-0-1 SOS after food)\nWarm saline rinses 3x daily'
  );
  const [nextVisit, setNextVisit] = useState(existingNote?.nextVisit || '');
  const [estimatedCost, setEstimatedCost] = useState<string>(
    existingNote?.estimatedCost ? existingNote.estimatedCost.toString() : '3500'
  );
  const [paymentStatus, setPaymentStatus] = useState<
    'paid' | 'partial' | 'pending'
  >(existingNote?.paymentStatus || 'paid');
  const [doctorRemarks, setDoctorRemarks] = useState(
    existingNote?.doctorRemarks || ''
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const prescriptions = prescriptionsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedNote: ClinicalNote = {
      id: existingNote?.id || `cn-${Date.now()}`,
      appointmentId: appointment.id,
      patientName: appointment.patientName,
      date: appointment.date,
      toothNumber: toothNumber.trim(),
      diagnosis: diagnosis.trim(),
      treatmentRendered: treatmentRendered.trim() || appointment.treatment,
      prescriptions,
      nextVisit: nextVisit || undefined,
      estimatedCost: estimatedCost ? parseFloat(estimatedCost) : undefined,
      paymentStatus,
      doctorRemarks: doctorRemarks.trim(),
    };

    onSaveNote(updatedNote);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">Clinical Notes & Treatment Record</h3>
              <p className="text-xs text-slate-400">
                Patient: <span className="text-white font-semibold">{appointment.patientName}</span> ({appointment.patientPhone}) · Ref: {appointment.id}
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Clinical note successfully recorded into patient file!</span>
            </div>
          )}

          {/* Quick patient reminder header */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="text-slate-500 block">Scheduled Date</span>
              <strong className="text-slate-900">{appointment.date}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Time Slot</span>
              <strong className="text-slate-900">{appointment.timeSlot}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Primary Treatment</span>
              <strong className="text-teal-700">{appointment.treatment}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Attending Doctor</span>
              <strong className="text-slate-900">{credentials.doctorName}</strong>
            </div>
          </div>

          {/* Tooth Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Tooth Notation / Number
              </label>
              <input
                type="text"
                value={toothNumber}
                onChange={(e) => setToothNumber(e.target.value)}
                placeholder="e.g. #36 Lower Left First Molar or #11 Upper Incisor"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Clinical Diagnosis
              </label>
              <input
                type="text"
                required
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g. Irreversible Pulpitis, Deep Class II caries, Periapical abscess"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Treatment Performed */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Treatment Rendered / Operative Notes
            </label>
            <textarea
              rows={3}
              required
              value={treatmentRendered}
              onChange={(e) => setTreatmentRendered(e.target.value)}
              placeholder="e.g. Access cavity prepared under local anesthesia. Working length determined (MB: 20mm, D: 21mm). Rotary canal shaping up to 25/04 file. Irrigated with 3% NaOCl and saline. Closed dressing placed."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Prescriptions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Pill className="w-3.5 h-3.5 text-teal-600" />
                Prescriptions & Medication Advice (One per line)
              </span>
            </label>
            <textarea
              rows={3}
              value={prescriptionsText}
              onChange={(e) => setPrescriptionsText(e.target.value)}
              placeholder="e.g. Tab. Augmentin 625mg (1-0-1 x 5 days)&#10;Tab. Zerodol-SP (1-0-1 SOS after meals)&#10;Chlorhexidine 0.2% mouthwash (10ml twice daily)"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Fees, Next Visit & Remarks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Fee Amount (₹)
              </label>
              <input
                type="number"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                placeholder="e.g. 3500"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) =>
                  setPaymentStatus(e.target.value as 'paid' | 'partial' | 'pending')
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
              >
                <option value="paid">Paid in Full</option>
                <option value="partial">Partial Advance</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Next Follow-Up Date
              </label>
              <input
                type="date"
                value={nextVisit}
                onChange={(e) => setNextVisit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Doctor Private Remarks & Prognosis
            </label>
            <input
              type="text"
              value={doctorRemarks}
              onChange={(e) => setDoctorRemarks(e.target.value)}
              placeholder="e.g. Advised patient to avoid hard chewing on left side until crown cementation."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Case Record</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all"
              >
                Save Clinical Note
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
