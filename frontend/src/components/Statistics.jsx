import { 
  Landmark, 
  Layers, 
  MapPin, 
  Sparkles, 
  TrendingUp,
  Info
} from 'lucide-react';
import { statistics } from '../data/schemesData';
import { useTranslation } from 'react-i18next';

export default function Statistics() {
  const { t } = useTranslation();
  const labels = {
    1: ['stats.schemes', 'stats.schemeSub'],
    2: ['stats.categories', 'stats.categoriesSub'],
    3: ['stats.states', 'stats.statesSub'],
    4: ['stats.recommendations', 'stats.recommendationsSub'],
  };
  const values = {
    1: '2,500+',
    2: '50+',
    3: t('stats.stateValue'),
    4: t('stats.recommendationsValue'),
  };
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-blue-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-teal-600" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-indigo-600" />;
      default:
        return <Landmark className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section className="py-14 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Demo Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-sm uppercase tracking-wider font-bold text-teal-700">
              {t('stats.title')}
            </h3>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              {t('stats.headline')}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium self-start sm:self-auto border border-slate-200">
            <Info className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('stats.demo')}</span>
          </div>
        </div>

        {/* 4 Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="group relative bg-slate-50/80 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-teal-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top Row: Icon & Pill */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-teal-50 border border-slate-200/70 group-hover:border-teal-200 flex items-center justify-center shadow-sm transition-colors">
                  {getIcon(stat.icon)}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <TrendingUp className="w-3 h-3" />
                  {t('stats.illustrative')}
                </span>
              </div>

              {/* Stat Value */}
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-1 group-hover:text-teal-900 transition-colors">
                {values[stat.id]}
              </div>

              {/* Label */}
              <div className="text-sm font-bold text-slate-800">
                {t(labels[stat.id][0])}
              </div>

              {/* Subtext */}
              <div className="text-xs text-slate-500 mt-1">
                {t(labels[stat.id][1])}
              </div>

              {/* Subtle bottom indicator line on hover */}
              <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-t-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
