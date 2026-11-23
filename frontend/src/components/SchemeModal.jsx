import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Award, 
  ShieldCheck, 
  Landmark
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SchemeModal({ scheme, onClose }) {
  const { t } = useTranslation();
  if (!scheme) return null;
  const categoryKey = scheme.category === 'Financial Assistance'
    ? 'financial'
    : scheme.category.toLowerCase();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label={t('scheme.close')}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              {t(`categories.${categoryKey}`)}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
              {t(`scheme.${scheme.level === 'Central Sector' ? 'centralSector' : 'centrallySponsored'}`)}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white pr-8">
            {scheme.name}
          </h3>

          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-teal-400" />
            <span>{scheme.department}</span>
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          
          {/* Highlight Benefit Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-700 mb-1">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>{t('scheme.benefit')}</span>
            </div>
            <div className="text-base font-extrabold text-emerald-900">
              {scheme.benefit}
            </div>
          </div>

          {/* Scheme Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
              {t('scheme.overview')}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {scheme.description}
            </p>
          </div>

          {/* Eligibility Criteria */}
          {scheme.eligibility && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>{t('scheme.eligibility')}</span>
              </h4>
              <ul className="space-y-2">
                {scheme.eligibility.map((criterion, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Documents */}
          {scheme.documents && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2.5 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>{t('scheme.documents')}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {scheme.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {t('scheme.demo')}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl"
            >
              {t('scheme.close')}
            </button>

            <a
              href={scheme.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm"
            >
              <span>{t('scheme.official')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
