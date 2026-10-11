import React from 'react';
import {
  Award,
  Calendar,
  CheckCircle,
  GraduationCap,
  Heart,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { DoctorCredentials } from '../types';

interface AboutDoctorProps {
  onOpenBooking: () => void;
  credentials: DoctorCredentials;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({
  onOpenBooking,
  credentials,
}) => {
  return (
    <section id="doctor" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Doctor Portrait / Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Doctor photo container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-slate-50 bg-teal-900">
                <img
                  src="https://images.unsplash.com/photo-1594824813583-066cb472304d?auto=format&fit=crop&w=800&q=80"
                  alt={credentials.doctorName}
                  className="w-full h-96 sm:h-[450px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-teal-500/90 text-white px-2 py-0.5 rounded">
                      Lead Dental Surgeon
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{credentials.doctorName}</h3>
                  <p className="text-xs text-teal-200">{credentials.title}</p>
                </div>
              </div>

              {/* Floating credentials tag */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white rounded-xl p-3.5 shadow-xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">4.9 Star Rating</div>
                  <div className="text-[11px] text-slate-500">Trusted in Ambernath West</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Clinical Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-200/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Meet Your Doctor</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Gentle Dentistry, Clear Guidance, Lasting Smiles
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              <strong>{credentials.doctorName}</strong> founded Family Dental Care with one central
              mission: to remove the fear and anxiety associated with dental treatments. With extensive
              expertise in single-sitting rotary endodontics, cosmetic smile enhancements, and dental
              prosthetics, she believes in preserving natural teeth whenever possible.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Every procedure begins with a thorough diagnosis using digital radiography and an open
              dialogue. Patients receive clear explanations of all treatment choices without unnecessary
              procedures or hidden costs.
            </p>

            {/* Doctor Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <Heart className="w-4 h-4 text-teal-600" />
                  <span>Painless Treatment Focus</span>
                </div>
                <p className="text-xs text-slate-600">
                  State-of-the-art computer-controlled rotary files and gentle local anesthesia protocols.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <GraduationCap className="w-4 h-4 text-teal-600" />
                  <span>Continuous Specialization</span>
                </div>
                <p className="text-xs text-slate-600">
                  Certified training in rotary endodontics, clear aligners, and dental implant restorations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Strict Sterilization</span>
                </div>
                <p className="text-xs text-slate-600">
                  Autoclaved instrument packs opened right in front of each patient.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Child & Senior Friendly</span>
                </div>
                <p className="text-xs text-slate-600">
                  A warm, welcoming demeanor that puts anxious children and elderly parents at complete ease.
                </p>
              </div>
            </div>

            {/* CTA bar */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation with Dr. Bhagyashree</span>
              </button>

              <a
                href={`tel:${credentials.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
