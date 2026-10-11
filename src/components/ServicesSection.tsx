import React from 'react';
import {
  Activity,
  ArrowRight,
  Clock,
  Crown,
  HeartHandshake,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Tag,
  Zap,
} from 'lucide-react';
import { DENTAL_SERVICES } from '../data/mockData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceToBook,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-teal-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-teal-600" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-teal-600" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-teal-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-teal-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-teal-600" />;
      case 'Stethoscope':
      default:
        return <Stethoscope className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-md mb-3 border border-teal-200">
            <span>Specialized Dental Treatments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Multispeciality Dental Solutions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            From emergency toothache relief and single-sitting root canals to life-long dental implants
            and clear orthodontic aligners, we combine modern technology with gentle clinical touch.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DENTAL_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Price indicator */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1 font-medium">
                    <Tag className="w-3.5 h-3.5 text-teal-600" />
                    Starting from:
                  </span>
                  <span className="font-bold text-teal-800">{service.priceEstimate}</span>
                </div>

                {/* Benefits Bullet Points */}
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold shrink-0">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="mt-6 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onSelectServiceToBook(service.title)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-teal-50 hover:bg-teal-600 text-teal-800 hover:text-white text-xs font-semibold transition-all group-hover:shadow-sm"
                >
                  <span>Book This Treatment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
