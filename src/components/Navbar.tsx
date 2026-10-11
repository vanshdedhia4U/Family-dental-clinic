import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Lock,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { DoctorCredentials } from '../types';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdminPortal: () => void;
  credentials: DoctorCredentials;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdminPortal,
  credentials,
  isLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner with direct contact & clinic timing */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Mon-Sat: 10:00 AM - 2:00 PM & 5:00 PM - 9:30 PM | Sun: 10 AM - 1 PM</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Chinchpada Chowk, Ambernath West
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${credentials.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-white hover:text-teal-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{credentials.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a
              href="https://maps.app.goo.gl/qSeWTRx3s3AVxnay5"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <span>4.9 ★ Google Rating</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-teal-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-teal-700 transition-colors">
                Family Dental Care
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-teal-50 text-teal-700 border border-teal-200/60 rounded">
                Multispeciality
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {credentials.doctorName} (B.D.S.)
            </p>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#services" className="hover:text-teal-700 transition-colors">
            Treatments
          </a>
          <a href="#gallery" className="hover:text-teal-700 transition-colors">
            Clinic Office Gallery
          </a>
          <a href="#doctor" className="hover:text-teal-700 transition-colors">
            About Doctor
          </a>
          <a href="#hygiene" className="hover:text-teal-700 transition-colors">
            Sterilization
          </a>
          <a href="#reviews" className="hover:text-teal-700 transition-colors">
            Reviews
          </a>
          <a href="#location" className="hover:text-teal-700 transition-colors">
            Find Us
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenAdminPortal}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
              isLoggedIn
                ? 'bg-teal-50 text-teal-800 border-teal-300 hover:bg-teal-100 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Clinic Doctor Portal & Schedule Manager"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isLoggedIn ? 'Doctor Dashboard' : 'Doctor Portal'}</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 active:scale-95 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 text-white"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-slate-700">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              Treatments
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              Clinic Gallery
            </a>
            <a
              href="#doctor"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              About Doctor
            </a>
            <a
              href="#hygiene"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              Sterilization
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              Reviews
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              Find Us
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminPortal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-slate-100 text-slate-700"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoggedIn ? 'Go to Doctor Dashboard' : 'Doctor / Staff Portal'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-teal-600 text-white shadow-md shadow-teal-600/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Online</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
