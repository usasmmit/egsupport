import React from 'react';

interface SiteLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showTagline?: boolean;
}

export const SiteLogo: React.FC<SiteLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showTagline = false
}) => {
  const iconSizes = {
    sm: 'w-6 h-6 sm:w-7 sm:h-7',
    md: 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9',
    lg: 'w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11'
  }[size];

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-xl md:text-2xl',
    lg: 'text-lg sm:text-2xl md:text-3xl'
  }[size];

  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Modern High-Trust Growth & Shield Vector Mark */}
      <div className={`relative ${iconSizes} shrink-0 flex items-center justify-center`}>
        {/* Glow backdrop on hover */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xs group-hover:bg-blue-500/40 transition-all"></div>
        
        {/* Sharp Geometric Emblem */}
        <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-blue-500/40 rounded-xl p-1.5 shadow-md flex items-center justify-center group-hover:border-blue-400 transition-colors">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]"
          >
            {/* Outer Shield Path */}
            <path
              d="M16 3L27 7V15C27 21.6 22.3 27.7 16 29C9.7 27.7 5 21.6 5 15V7L16 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            />
            {/* Dynamic Growth / Lightning SMM Icon */}
            <path
              d="M17.5 8L10.5 17H16L14.5 24L21.5 15H16L17.5 8Z"
              fill="currentColor"
              className="text-emerald-400 group-hover:text-white transition-colors"
            />
          </svg>

          {/* Active Status Pulse Dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-slate-950"></span>
          </span>
        </div>
      </div>

      {/* Typography Block */}
      <div className="flex flex-col justify-center text-left">
        <div className={`font-black tracking-tight leading-none ${textSizes} ${isDark ? 'text-slate-950' : 'text-white'}`}>
          <span>Smmservice</span>
          <span className="text-blue-600 font-extrabold">.co.uk</span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
              Verified Accounts & SMM
            </span>
            <span className="text-[8px] bg-blue-500/15 text-blue-500 px-1 py-0.2 rounded font-bold">
              PRO
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
