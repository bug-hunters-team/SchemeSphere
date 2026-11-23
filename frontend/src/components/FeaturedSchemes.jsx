import { useState } from 'react';
import { 
  Building2, 
  Tag, 
  Search, 
  AlertCircle,
  FileText,
  ArrowRight
} from 'lucide-react';
import { sampleSchemes } from '../data/schemesData';
import { schemeCategories } from '../data/schemesData';
import { useTranslation } from 'react-i18next';

export default function FeaturedSchemes({ onSelectScheme, activeCategoryFilter }) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(activeCategoryFilter || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Agriculture', 'Healthcare', 'Housing', 'Education', 'Employment', 'Financial Assistance'];
  const getCategoryKey = (name) => {
    const category = schemeCategories.find((item) => item.name === name);
    return category?.id === 'social-welfare' ? 'social' : category?.id || name;
  };

  const filteredSchemes = sampleSchemes.filter((scheme) => {
    const matchesCategory = selectedCategory === 'All' || scheme.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="schemes" className="py-20 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3 border border-teal-200">
              <span>{t('featured.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t('featured.title')}
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              {t('featured.description')}
            </p>
          </div>

          {/* Demonstration Data Alert Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium shadow-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{t('featured.demo')}</span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 pr-2 hidden sm:inline">
              {t('featured.filter')}
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat === 'All' ? t('featured.all') : t(`categories.${getCategoryKey(cat)}`)}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('featured.search')}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-teal-200"
            >
              <div>
                {/* Card Top: Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
                    <Tag className="w-3 h-3 text-teal-600" />
                    {t(`categories.${getCategoryKey(scheme.category)}`)}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                    <Building2 className="w-3 h-3 text-slate-500" />
                    {t(`scheme.${scheme.level === 'Central Sector' ? 'centralSector' : 'centrallySponsored'}`)}
                  </span>
                </div>

                {/* Scheme Name */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors leading-snug">
                  {scheme.name}
                </h3>

                {/* Key Benefit Banner */}
                <div className="my-3 px-3 py-2 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span className="line-clamp-1">{scheme.benefit}</span>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {scheme.description}
                </p>
              </div>

              {/* Card Footer: View Details Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {scheme.department}
                </span>

                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-teal-700 rounded-xl transition-all shadow-sm hover:shadow"
                >
                  <span>{t('featured.view')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Result */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="text-base font-bold text-slate-800">{t('featured.empty')}</h4>
            <p className="text-xs text-slate-500 mt-1">{t('featured.tryAgain')}</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
            >
              {t('featured.reset')}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
