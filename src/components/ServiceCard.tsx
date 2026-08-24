import React from 'react';
import { Star, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ServiceItem } from '../types';
import { useCart } from '../context/CartContext';
import { BrandLogo } from './BrandLogo';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (slug: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const { formatPrice } = useCart();

  return (
    <div className="bg-white border border-slate-200 hover:border-emerald-500/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group hover:-translate-y-0.5">
      <div className="p-5 space-y-4">
        {/* Header: Brand Logo, Category & Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <BrandLogo name={service.title} size="md" />
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                {service.category}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-0.5">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <span className="font-bold text-slate-900">{service.rating}</span>
                <span className="text-slate-400 font-medium">({service.reviewCount})</span>
              </div>
            </div>
          </div>

          {service.badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
              service.badge === 'Bestseller'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : service.badge === 'Popular'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-slate-900 text-white'
            }`}>
              {service.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(service.slug)}
          className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
        >
          {service.title}
        </h3>

        {/* Short description preview */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {service.shortDescription.split('\n')[0]}
        </p>

        {/* Feature bullets preview */}
        <div className="space-y-1.5 pt-3 border-t border-slate-100">
          {service.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
              <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Pricing & CTA */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">
            Starting Price
          </span>
          <div className="text-lg font-black text-slate-950">
            {formatPrice(service.startingPrice)}
          </div>
        </div>

        <button
          onClick={() => onSelect(service.slug)}
          className="px-4 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs hover:shadow cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

