import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CTASection({ onOpenAuth }) {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden text-white">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-600/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>{t('cta.badge')}</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          {t('cta.title')}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('cta.description')}
        </p>

        {/* Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenAuth('register')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-slate-900 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>{t('cta.start')}</span>
            <ArrowRight className="w-5 h-5 text-slate-900" />
          </button>

          <a
            href="#schemes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
          >
            {t('cta.explore')}
          </a>
        </div>

        {/* Trust Points */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>{t('cta.free')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-400" />
            <span>{t('cta.privacy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>{t('cta.official')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
