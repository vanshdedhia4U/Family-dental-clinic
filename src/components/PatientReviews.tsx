import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { PATIENT_REVIEWS } from '../data/mockData';

export const PatientReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-md mb-3 border border-teal-200">
              <span>Patient Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real Stories from Happy, Healthy Smiles
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Read verified patient experiences from Ambernath, Ulhasnagar, and Kalyan.
            </p>
          </div>

          <a
            href="https://maps.app.goo.gl/qSeWTRx3s3AVxnay5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs sm:text-sm font-semibold transition-all shadow-sm"
          >
            <span>View All Google Maps Reviews</span>
            <ExternalLink className="w-4 h-4 text-slate-500" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATIENT_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  "{review.reviewText}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                <div className="text-[11px] text-teal-700 font-medium">{review.treatment}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{review.date} · Verified Google Patient</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
