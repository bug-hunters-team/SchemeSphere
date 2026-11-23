import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Compass,
  Menu,
  X,
  Globe,
  ChevronDown,
  ArrowRight,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { supportedLanguages } from '../i18n/i18n';

const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem('schemeSphereUser');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Derived state on every route render or action
  const currentUser = getStoredUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('schemeSphereUser');
    navigate('/');
  };

  const navLinks = [
    { name: t('nav.home'), href: "/#home" },
    { name: t('nav.explore'), href: "/#schemes" },
    { name: t('nav.categories'), href: "/#categories" },
    { name: t('nav.how'), href: "/#how-it-works" },
    { name: t('nav.assistant'), href: "/#ai-assistant" },
    { name: t('nav.about'), href: "/#about" },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-teal-600 flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-teal-300 animate-pulse-subtle" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Scheme<span className="text-teal-600">Sphere</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                AI Scheme Finder
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all"
                title={t('nav.selectLanguage')}
              >
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span>{t(`assistantLanguages.${i18n.resolvedLanguage}`)}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Language
                  </div>
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-teal-50 hover:text-teal-800 transition-colors ${i18n.resolvedLanguage === lang.code ? 'font-semibold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                        }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[11px] text-slate-400">{lang.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {currentUser ? (
              /* If User is Logged In */
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-teal-700" />
                  <span>{t('nav.dashboard')}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title={t('nav.logout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* If Logged Out - Register First, then Login */
              <div className="flex items-center gap-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-slate-900 via-blue-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>{t('nav.register')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                </Link>

                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {t('nav.login')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {!currentUser && (
              <Link
                to="/register"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg"
              >
                Register
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label={t('nav.toggleMenu')}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-2 py-1 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-teal-600" /> {t('nav.language')}:
              </span>
              <select
                value={i18n.resolvedLanguage}
                onChange={(e) => {
                  if (supportedLanguages.some((language) => language.code === e.target.value)) {
                    i18n.changeLanguage(e.target.value);
                  }
                }}
                className="text-xs bg-transparent font-semibold text-slate-800 border-none focus:outline-none"
              >
                {supportedLanguages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name} ({l.native})
                  </option>
                ))}
              </select>
            </div>

            {currentUser ? (
              <div className="space-y-2 pt-1">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-xs font-bold text-center block text-slate-900 bg-teal-50 border border-teal-200 rounded-lg"
                >
                  {t('nav.citizenDashboard', { name: currentUser.name })}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-2 text-xs font-bold text-rose-700 bg-rose-50 rounded-lg"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg text-center"
                >
                  {t('nav.register')}
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center"
                >
                  {t('nav.login')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
