import { 
  Compass, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck
} from 'lucide-react';
import { schemeCategories } from '../data/schemesData';
import { useTranslation } from 'react-i18next';

export default function Footer({ onSelectCategory }) {
  const { t } = useTranslation();
  const quickLinks = [
    { key: "nav.home", href: "#home" },
    { key: "nav.explore", href: "#schemes" },
    { key: "nav.how", href: "#how-it-works" },
    { key: "nav.assistant", href: "#ai-assistant" },
    { key: "nav.categories", href: "#categories" },
    { key: "nav.about", href: "#about" },
  ];

  return (
    <footer id="about" className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Logo & Project Description (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 text-teal-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Scheme<span className="text-teal-400">Sphere</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                  {t('footer.brand')}
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-4">
              {t('footer.description')}
            </p>

            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('footer.initiative')}</span>
            </div>
          </div>

          {/* Col 2: Quick Links (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Scheme Categories (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('footer.schemeCategories')}
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-xs">
              {schemeCategories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#categories"
                    onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                    className="hover:text-teal-400 transition-colors flex items-center justify-between pr-4"
                  >
                    <span>{t(`categories.${cat.id === 'social-welfare' ? 'social' : cat.id}`)}</span>
                    <span className="text-[10px] text-slate-600">
                      {cat.count.replace(' Schemes', ` ${t('categories.countSuffix')}`)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Grievance Section (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('footer.contact')}
            </h4>
            <p className="text-xs text-slate-400">
              {t('footer.assistance')}
            </p>

            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{t('footer.email')}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="inline-block text-[11px] bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg">
                {t('footer.csc')}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {t('footer.copyright')}
          </div>
          
          <div className="flex items-center gap-4 text-slate-500">
            <a href="#about" className="hover:text-slate-300 transition-colors">{t('footer.privacy')}</a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">{t('footer.terms')}</a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">{t('footer.accessibility')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
