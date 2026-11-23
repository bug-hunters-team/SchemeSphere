import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Bot, 
  Smartphone
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero({ onOpenFindSchemes }) {
  const { t } = useTranslation();
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-white">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-100/40 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/40 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content (Col 7) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span>{t('hero.badge')}</span>
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              {t('hero.title')}{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-700 to-slate-900">
                {t('hero.highlight')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t('hero.description')}
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenFindSchemes}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-slate-900 via-blue-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 rounded-xl shadow-lg shadow-teal-900/10 hover:shadow-teal-900/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>{t('hero.find')}</span>
                <ArrowRight className="w-4 h-4 text-teal-300" />
              </button>

              <a
                href="#schemes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl shadow-sm transition-all duration-200"
              >
                <Search className="w-4 h-4 text-teal-600" />
                <span>{t('hero.explore')}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t('hero.verified')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>{t('hero.free')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-blue-600" />
                <span>{t('hero.multilingual')}</span>
              </div>
            </div>
          </div>

          {/* Right Visual Illustration (Col 5) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Outer decorative card */}
              <div className="relative bg-gradient-to-br from-white to-slate-50/80 p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/70">
                
                {/* Header of digital portal card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-600/10 flex items-center justify-center text-teal-700">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{t('hero.citizenPortal')}</h4>
                      <p className="text-[10px] text-slate-400">{t('hero.digitalGovernance')}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live 2026
                  </span>
                </div>

                {/* Illustration Scene: Citizens Accessing Digital Schemes */}
                <div className="relative my-4 p-4 rounded-2xl bg-gradient-to-b from-blue-50/60 via-teal-50/40 to-slate-50 border border-teal-100/60 overflow-hidden">
                  
                  {/* Digital Connectivity Vector Graphic */}
                  <svg viewBox="0 0 400 240" className="w-full h-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0f766e" />
                        <stop offset="100%" stopColor="#1e3a8a" />
                      </linearGradient>
                      <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>

                    {/* Central Digital Tower / Emblem node */}
                    <circle cx="200" cy="80" r="42" fill="white" stroke="#0d9488" strokeWidth="2.5" strokeDasharray="4 2" />
                    <circle cx="200" cy="80" r="32" fill="url(#cloudGrad)" />
                    {/* Emblem Icon / Pillar Motif */}
                    <path d="M192 92V72H208V92H192ZM190 72L200 64L210 72H190ZM196 76H204V88H196V76Z" fill="white" />
                    <text x="200" y="102" textAnchor="middle" fill="#0f766e" fontSize="8" fontWeight="bold">DIGITAL INDIA</text>

                    {/* Connecting Digital Beams */}
                    <path d="M75 165 C 120 120, 160 95, 175 85" stroke="url(#glowLine)" strokeWidth="2" strokeDasharray="4 3" />
                    <path d="M200 120 L 200 155" stroke="url(#glowLine)" strokeWidth="2" strokeDasharray="4 3" />
                    <path d="M325 165 C 280 120, 240 95, 225 85" stroke="url(#glowLine)" strokeWidth="2" strokeDasharray="4 3" />

                    {/* Citizen 1: Indian Farmer with Mobile Crop Advisor */}
                    <g transform="translate(40, 140)">
                      <rect x="0" y="10" width="70" height="75" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                      <circle cx="35" cy="28" r="14" fill="#dcfce7" />
                      <ellipse cx="35" cy="22" rx="13" ry="7" fill="#16a34a" />
                      <circle cx="35" cy="30" r="8" fill="#fde68a" />
                      <path d="M20 54 C20 44, 50 44, 50 54 Z" fill="#15803d" />
                      <rect x="42" y="46" width="10" height="15" rx="2" fill="#0f172a" />
                      <rect x="44" y="48" width="6" height="11" rx="1" fill="#38bdf8" />
                      <text x="35" y="72" textAnchor="middle" fill="#15803d" fontSize="7.5" fontWeight="bold">{t('hero.farmerBenefit')}</text>
                    </g>

                    {/* Citizen 2: Student Accessing Scholarship */}
                    <g transform="translate(165, 150)">
                      <rect x="0" y="0" width="70" height="75" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                      <circle cx="35" cy="22" r="14" fill="#e0e7ff" />
                      <path d="M23 16 L35 11 L47 16 L35 21 Z" fill="#3730a3" />
                      <circle cx="35" cy="24" r="8" fill="#fed7aa" />
                      <path d="M20 46 C20 36, 50 36, 50 46 Z" fill="#2563eb" />
                      <rect x="25" y="46" width="20" height="11" rx="1.5" fill="#64748b" />
                      <rect x="27" y="47" width="16" height="7" rx="1" fill="#22d3ee" />
                      <text x="35" y="65" textAnchor="middle" fill="#1d4ed8" fontSize="7.5" fontWeight="bold">{t('hero.scholarship')}</text>
                    </g>

                    {/* Citizen 3: Female Entrepreneur with Business Seed Aid */}
                    <g transform="translate(290, 140)">
                      <rect x="0" y="10" width="70" height="75" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                      <circle cx="35" cy="28" r="14" fill="#fce7f3" />
                      <circle cx="35" cy="27" r="11" fill="#475569" />
                      <circle cx="35" cy="29" r="8" fill="#fcd34d" />
                      <circle cx="35" cy="28" r="1" fill="#dc2626" />
                      <path d="M20 54 C20 44, 50 44, 50 54 Z" fill="#db2777" />
                      <rect x="36" y="45" width="13" height="15" rx="2" fill="#0f172a" />
                      <rect x="38" y="47" width="9" height="11" rx="1" fill="#f472b6" />
                      <text x="35" y="72" textAnchor="middle" fill="#be185d" fontSize="7.5" fontWeight="bold">{t('hero.microLoan')}</text>
                    </g>
                  </svg>
                </div>

                {/* Interactive Scheme Match Card Simulation */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-teal-50/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        ₹
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{t('hero.directTransfer')}</div>
                        <div className="text-[10px] text-slate-500">{t('hero.ekycApproved')}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      Eligible
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        +
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{t('hero.healthAssurance')}</div>
                        <div className="text-[10px] text-slate-500">{t('hero.healthCover')}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-md">
                      Covered
                    </span>
                  </div>
                </div>

                {/* Floating AI Match Notification Badge */}
                <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-slate-900 text-white px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800 animate-float">
                  <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-slate-900">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{t('hero.matches')}</span>
                    </div>
                    <div className="text-[10px] text-slate-300">{t('hero.instantEvaluation')}</div>
                  </div>
                </div>

                {/* Floating DBT Trust Badge */}
                <div className="absolute -top-3 -right-3 sm:-right-4 bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-200/90 flex items-center gap-2 animate-float-delayed">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  <div className="text-left">
                    <p className="text-[10px] font-extrabold text-slate-800 leading-none">{t('hero.directBenefit')}</p>
                    <p className="text-[9px] text-slate-500 leading-none mt-0.5">{t('hero.dbt')}</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
