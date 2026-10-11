import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Lock,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AboutDoctor } from './components/AboutDoctor';
import { AdminPortalModal } from './components/AdminPortal/AdminPortalModal';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LocationContact } from './components/LocationContact';
import { Navbar } from './components/Navbar';
import { OfficeGallery } from './components/OfficeGallery';
import { PatientReviews } from './components/PatientReviews';
import { ServicesSection } from './components/ServicesSection';
import {
  Appointment,
  ClinicScheduleSettings,
  ClinicalNote,
  DoctorCredentials,
} from './types';
import {
  addAppointment,
  getDoctorCredentials,
  getScheduleSettings,
  getStoredAppointments,
  saveClinicalNote,
  saveDoctorCredentials,
  saveScheduleSettings,
  updateAppointmentStatus,
} from './utils/storage';

export default function App() {
  const [credentials, setCredentials] = useState<DoctorCredentials>(
    getDoctorCredentials
  );
  const [appointments, setAppointments] = useState<Appointment[]>(
    getStoredAppointments
  );
  const [scheduleSettings, setScheduleSettings] =
    useState<ClinicScheduleSettings>(getScheduleSettings);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Handle new appointment booking
  const handleBookAppointment = (newAppt: Appointment) => {
    const updated = addAppointment(newAppt);
    setAppointments(updated);
  };

  // Handle appointment status update
  const handleUpdateStatus = (id: string, status: Appointment['status']) => {
    const updated = updateAppointmentStatus(id, status);
    setAppointments(updated);
  };

  // Handle clinical note save
  const handleSaveClinicalNote = (note: ClinicalNote) => {
    const updated = saveClinicalNote(note);
    setAppointments(updated);
  };

  // Handle credentials update from Agency Setup
  const handleUpdateCredentials = (newCreds: DoctorCredentials) => {
    saveDoctorCredentials(newCreds);
    setCredentials(newCreds);
  };

  // Handle schedule settings update
  const handleUpdateScheduleSettings = (settings: ClinicScheduleSettings) => {
    saveScheduleSettings(settings);
    setScheduleSettings(settings);
  };

  const handleOpenBookingWithService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => {
          setPreselectedService('');
          setIsBookingModalOpen(true);
        }}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        credentials={credentials}
        isLoggedIn={isLoggedIn}
      />

      {/* Hero Section */}
      <Hero
        onOpenBooking={() => {
          setPreselectedService('');
          setIsBookingModalOpen(true);
        }}
        credentials={credentials}
      />

      {/* Services Section */}
      <ServicesSection onSelectServiceToBook={handleOpenBookingWithService} />

      {/* Clinic Office Gallery Section */}
      <OfficeGallery
        onOpenBooking={() => {
          setPreselectedService('');
          setIsBookingModalOpen(true);
        }}
      />

      {/* Doctor Bio and Philosophy */}
      <AboutDoctor
        onOpenBooking={() => {
          setPreselectedService('');
          setIsBookingModalOpen(true);
        }}
        credentials={credentials}
      />

      {/* Patient Reviews Section */}
      <PatientReviews />

      {/* Location, Timings and Contact Section */}
      <LocationContact
        onOpenBooking={() => {
          setPreselectedService('');
          setIsBookingModalOpen(true);
        }}
        credentials={credentials}
      />

      {/* Footer */}
      <Footer
        onOpenBooking={() => {
          setPreselectedService('');
          setIsBookingModalOpen(true);
        }}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        credentials={credentials}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookAppointment={handleBookAppointment}
        credentials={credentials}
        scheduleSettings={scheduleSettings}
        existingAppointments={appointments}
        preselectedService={preselectedService}
      />

      {/* Admin / Doctor Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        credentials={credentials}
        onUpdateCredentials={handleUpdateCredentials}
        appointments={appointments}
        scheduleSettings={scheduleSettings}
        onUpdateStatus={handleUpdateStatus}
        onSaveClinicalNote={handleSaveClinicalNote}
        onUpdateScheduleSettings={handleUpdateScheduleSettings}
        onAddManualAppointment={handleBookAppointment}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Floating Action Buttons (Sticky Quick Contacts & Booking) */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2.5">
        {/* WhatsApp Quick Chat */}
        <a
          href={`https://wa.me/919325818057?text=${encodeURIComponent(
            'Hello Dr. Bhagyashree, I would like to book a dental checkup at Family Dental Care.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Quick Schedule Button */}
        <button
          onClick={() => {
            setPreselectedService('');
            setIsBookingModalOpen(true);
          }}
          className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>
    </div>
  );
}
