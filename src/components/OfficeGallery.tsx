import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Eye,
  Maximize2,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types';

interface OfficeGalleryProps {
  onOpenBooking: () => void;
}

export const OfficeGallery: React.FC<OfficeGalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Clinic Spaces' },
    { id: 'operatory', label: 'Operatory & Chairs' },
    { id: 'technology', label: 'Technology & RVG' },
    { id: 'sterilization', label: 'Class-B Sterilization' },
    { id: 'reception', label: 'Reception & Lounge' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md mb-3 border border-teal-200/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Office Tour & Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              A Modern, Spotless Clinic Designed for Your Comfort
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Take a walk through our clinical facility in Ambernath West. From German ergonomic dental
              chairs and low-radiation RVG digital X-rays to our 5-stage hospital sterilization autoclave,
              every corner is built to ensure a relaxed, infection-free experience.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <span>Book an In-Person Visit</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-800 px-2.5 py-1 rounded-md shadow-sm">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-teal-600 text-white px-2.5 py-1 rounded-md shadow-md">
                    <Maximize2 className="w-3 h-3" />
                    <span>View Details</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Highlights tags */}
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap gap-1.5">
                  {item.highlights.slice(0, 2).map((hl, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded"
                    >
                      ✓ {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sterilization and Cleanliness Guarantee Banner */}
        <div id="hygiene" className="mt-14 p-6 sm:p-8 rounded-2xl bg-teal-900 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Our Infection Prevention Protocol</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                100% Sealed & Sterilized: Zero Compromise on Patient Safety
              </h3>
              <p className="text-sm text-teal-100 max-w-2xl leading-relaxed">
                Instruments are ultrasonically cleaned, individually sealed into sterile pouches, and
                subjected to European Class-B pressurized autoclave cycles before each patient visit.
                Disposable items (gloves, suction tips, patient bibs, injection needles) are discarded immediately.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <button
                onClick={onOpenBooking}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-95 text-center"
              >
                Experience Safe Dental Care
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Photo */}
            <div className="relative aspect-[16/10] bg-slate-950 shrink-0">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-4">
                <span className="text-xs font-semibold bg-teal-600 text-white px-2.5 py-1 rounded">
                  {selectedPhoto.categoryLabel}
                </span>
              </div>
            </div>

            {/* Modal Description */}
            <div className="p-6 overflow-y-auto">
              <h3 className="text-xl font-bold text-slate-900">{selectedPhoto.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {selectedPhoto.description}
              </p>

              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Clinical Features & Standards
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPhoto.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedPhoto(null);
                    onOpenBooking();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-teal-600/20"
                >
                  Book Appointment in this Operatory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
