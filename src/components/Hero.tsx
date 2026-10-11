import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { DoctorCredentials } from '../types';

interface HeroProps {
  onOpenBooking: () => void;
  credentials: DoctorCredentials;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, credentials }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-slate-50 pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Clinic Hero Brief */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100/80 border border-teal-200/70 text-teal-900 text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
              <span>Welcoming New Patients & Family Walk-ins</span>
              <span className="text-teal-400">·</span>
              <span className="text-teal-700">Ambernath West</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Gentle, High-Tech{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-600">
                Multispeciality Dental Care
              </span>{' '}
              for Your Whole Family
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Experience truly painless dental treatments led by{' '}
              <strong className="text-slate-900 font-semibold">{credentials.doctorName}</strong>{' '}
              ({credentials.title}). From single-sitting Root Canals and Dental Implants to
              Invisible Aligners and pediatric care, we prioritize your comfort, hygiene, and lasting smile.
            </p>

            {/* Quick verification proof points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 pb-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Painless Single-Sitting RCT</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>100% Class-B Sterilization</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Google Calendar Sync</span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-base shadow-lg shadow-teal-600/25 active:scale-[0.98] transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Appointment</span>
              </button>

              <a
                href="#gallery"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 shadow-sm transition-all"
              >
                <span>Tour Clinic Office</span>
              </a>

              <a
                href={`tel:${credentials.phone.replace(/\s+/g, '')}`}
                className="sm:hidden flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium text-sm"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>Call {credentials.phone}</span>
              </a>
            </div>

            {/* Google Maps ratings card */}
            <div className="pt-4 flex items-center gap-4 border-t border-slate-200">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs sm:text-sm text-slate-600">
                <span className="font-bold text-slate-900">4.9 / 5.0 Rating</span> on Google Maps{' '}
                <a
                  href="https://maps.app.goo.gl/qSeWTRx3s3AVxnay5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 font-semibold ml-1 underline underline-offset-2"
                >
                  <span>View Verified Reviews</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Clinic Card + Quick Highlights */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Clinic Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Family Dental Care Operatory Room"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-500 text-white uppercase tracking-wider">
                      Advanced Operatory
                    </span>
                    <span className="text-xs text-slate-300">Pneumatic German Chair</span>
                  </div>
                  <h3 className="font-bold text-lg text-white">
                    Family Dental Care Multispeciality Clinic
                  </h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    Above City Medical, Chinchpada, Ambernath West
                  </p>
                </div>
              </div>

              {/* Floating Floating card: Today's OPD Status */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white rounded-xl p-4 shadow-xl border border-slate-200/80 max-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                      Clinic Hours Today
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      10 AM - 2 PM & 5 PM - 9:30 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card: Calendar Sync indicator */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-slate-200 text-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
                  G
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Google Calendar</div>
                  <div className="text-[11px] text-teal-600 font-medium">Auto-sync & Reminders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
