import { useState } from 'react';
import { 
  GraduationCap, 
  Sprout, 
  HeartPulse, 
  Briefcase, 
  Users, 
  Home, 
  IndianRupee, 
  ShieldCheck,
  ArrowRight,
  Search
} from 'lucide-react';
import { schemeCategories } from '../data/schemesData';
import { useTranslation } from 'react-i18next';

export default function Categories({ onSelectCategory }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      case 'Sprout':
        return <Sprout className="w-6 h-6" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'Home':
        return <Home className="w-6 h-6" />;
      case 'IndianRupee':
        return <IndianRupee className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      default:
        return <ShieldCheck className="w-6 h-6" />;
    }
  };

  const getCategoryKey = (categoryId) => (
    categoryId === 'social-welfare' ? 'social' : categoryId
  );

  const filteredCategories = schemeCategories.filter((category) => (
    t(`categories.${getCategoryKey(category.id)}`).toLowerCase().includes(searchTerm.toLowerCase())
    || t(`categories.${getCategoryKey(category.id)}Description`).toLowerCase().includes(searchTerm.toLowerCase())
  ));

  return (
    <section id="categories" className="py-20 bg-slate-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3 border border-teal-200">
            <span>{t('categories.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('categories.title')}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t('categories.description')}
          </p>

          {/* Quick Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('categories.search')}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory && onSelectCategory(category.name)}
              className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Count Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${category.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    {getCategoryIcon(category.icon)}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${category.lightBg}`}>
                    {category.count.replace(' Schemes', ` ${t('categories.countSuffix')}`)}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {t(`categories.${getCategoryKey(category.id)}`)}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {t(`categories.${getCategoryKey(category.id)}Description`)}
                </p>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-teal-700 transition-colors">
                <span>{t('categories.view')}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">{t('categories.empty')}</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 text-xs font-semibold text-teal-600 hover:underline"
            >
              {t('categories.clear')}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
