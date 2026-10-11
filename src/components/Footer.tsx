import React from 'react';
import {
  Calendar,
  Clock,
  ExternalLink,
  Heart,
  Lock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { DoctorCredentials } from '../types';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdminPortal: () => void;
  credentials: DoctorCredentials;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenAdminPortal,
  credentials,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Clinic Overview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-tight">
                  Family Dental Care
                </h3>
                <p className="text-teal-400 font-medium text-xs">
                  Multispeciality Dental Clinic · {credentials.doctorName}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Providing compassionate, high-tech, and painless dental care in Ambernath West.
              Specialized in single-sitting Root Canals, Dental Implants, Clear Aligners, and family preventive dentistry.
            </p>

            <div className="space-y-1 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{credentials.clinicAddress}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{credentials.phone}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Treatments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Specialized Treatments
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Single-Sitting Root Canal (RCT)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Dental Implants & Fixed Teeth
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Clear Aligners & Orthodontics
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  CAD/CAM Zirconia Crowns & Bridges
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Teeth Whitening & Ultrasonic Scaling
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Kids & Pediatric Preventive Care
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: OPD Timings & Fast Booking */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Clinic OPD Timings
            </h4>
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Monday – Saturday:</span>
                <span className="font-semibold text-white">10 AM - 2 PM & 5 PM - 9:30 PM</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Sunday:</span>
                <span className="font-semibold text-teal-400">10:00 AM – 01:00 PM (By Appt)</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Appointment Online</span>
              </button>

              <button
                onClick={onOpenAdminPortal}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs border border-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3 h-3" />
                <span>Doctor / Staff Practice Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Family Dental Care Multispeciality Dental Clinic. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://maps.app.goo.gl/qSeWTRx3s3AVxnay5"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 flex items-center gap-1"
            >
              <span>Google Maps Verified</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">·</span>
            <span>Sterilization Class-B Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
