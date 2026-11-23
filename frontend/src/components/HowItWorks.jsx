import { 
  UserPlus, 
  Sparkles, 
  FileCheck2, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { howItWorksSteps } from '../data/schemesData';
import { useTranslation } from 'react-i18next';

export default function HowItWorks({ onOpenFindSchemes }) {
  const { t } = useTranslation();
  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'UserPlus':
        return <UserPlus className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'FileCheck2':
        return <FileCheck2 className="w-6 h-6" />;
      case 'CheckCircle':
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-3 border border-blue-200">
            <span>{t('how.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('how.title')}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t('how.description')}
          </p>
        </div>

        {/* Workflow Steps - Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          
          {/* Connecting Line on Desktop (Hidden on mobile) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 border-t-2 border-dashed border-slate-200 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {howItWorksSteps.map((step, idx) => (
              <div 
                key={step.step}
                className="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 relative flex flex-col justify-between"
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  {/* Step Icon Badge */}
                  <div className={`w-14 h-14 rounded-2xl ${step.accent} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    {getStepIcon(step.icon)}
                  </div>

                  {/* Step Number */}
                  <span className="text-3xl font-extrabold text-slate-200 group-hover:text-teal-200 transition-colors font-mono">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    {t(`how.${['create', 'discover', 'benefits', 'apply'][idx]}`)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t(`how.${['createDescription', 'discoverDescription', 'benefitsDescription', 'applyDescription'][idx]}`)}
                  </p>
                </div>

                {/* Step Progress Marker */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-teal-700">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>{t('how.step', { number: idx + 1 })}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-14 max-w-2xl mx-auto text-center p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900">{t('how.ready')}</h4>
            <p className="text-xs text-slate-500">{t('how.time')}</p>
          </div>
          <button
            onClick={onOpenFindSchemes}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-teal-700 rounded-xl transition-colors shrink-0"
          >
            <span>{t('how.start')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
          </button>
        </div>

      </div>
    </section>
  );
}
