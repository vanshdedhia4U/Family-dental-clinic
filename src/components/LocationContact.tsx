import React from 'react';
import {
  Calendar,
  Clock,
  Compass,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { DoctorCredentials } from '../types';

interface LocationContactProps {
  onOpenBooking: () => void;
  credentials: DoctorCredentials;
}

export const LocationContact: React.FC<LocationContactProps> = ({
  onOpenBooking,
  credentials,
}) => {
  return (
    <section id="location" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Clinic Contact & Timing Card */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md mb-3 border border-teal-200/60">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Our Clinic</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Conveniently Located in Ambernath West
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Easy landmark access near Father Agnel School. Ample parking space available nearby.
              </p>
            </div>

            {/* Address box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Address & Landmark</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {credentials.clinicAddress}
                  </p>
                  <p className="text-xs text-teal-700 font-semibold mt-1">
                    Landmark: Above City Medical · Near Father Agnel Multipurpose School
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.app.goo.gl/qSeWTRx3s3AVxnay5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-800 underline underline-offset-4"
                >
                  <span>Open in Google Maps App / Navigation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Timings Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="w-full">
                  <h4 className="text-sm font-bold text-slate-900">Clinic OPD Timings</h4>
                  <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between border-b border-slate-200/60 pb-1">
                      <span className="font-medium text-slate-800">Monday – Saturday</span>
                      <span className="font-semibold text-slate-900">10:00 AM – 2:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-1">
                      <span className="font-medium text-slate-800">Evening Shift (Mon–Sat)</span>
                      <span className="font-semibold text-slate-900">5:00 PM – 9:30 PM</span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                      <span className="font-medium text-slate-800">Sunday</span>
                      <span className="font-semibold text-teal-700">10:00 AM – 1:00 PM (By Appt)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Calling & WhatsApp */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${credentials.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>Call Clinic</span>
              </a>

              <a
                href={`https://wa.me/919325818057?text=${encodeURIComponent(
                  'Hello Dr. Bhagyashree, I would like to inquire about dental treatment at Family Dental Care.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Preview */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-white">
              <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold">
                  <Compass className="w-4 h-4 text-teal-400" />
                  <span>Google Maps · Family Dental Care, Ambernath West</span>
                </div>
                <a
                  href="https://maps.app.goo.gl/qSeWTRx3s3AVxnay5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-teal-300 hover:text-white transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded Google Map iframe centered around 19.2146662, 73.1990436 */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-100">
                <iframe
                  title="Family Dental Care Multispeciality Dental Clinic Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.1491763294347!2d73.1964687!3d19.2146662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79339794705ab%3A0x1158ccc6c341414c!2sFamily%20Dental%20care%20multispeciality%20dental%20clinic!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                <span>
                  📍 Coordinates: 19.2146° N, 73.1990° E (Chinchpada Chowk, Ambernath West)
                </span>
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm transition-all text-xs"
                >
                  Book Visit Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
