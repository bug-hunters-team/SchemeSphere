import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Compass, 
  Mail, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  KeyRound
} from 'lucide-react';
import LanguagePicker from '../components/LanguagePicker';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError(t('auth.requiredEmail'));
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError(t('auth.invalidEmail'));
      return;
    }

    setIsLoading(true);

    // Simulated mock submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-teal-500 selection:text-white">
      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-teal-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-4 h-4 text-teal-300" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Scheme<span className="text-teal-600">Sphere</span>
          </span>
        </Link>

        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm hover:shadow transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('auth.backLogin')}</span>
        </Link>
        <LanguagePicker />
      </header>

      {/* Main Card Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mx-auto mb-3 shadow-sm">
              <KeyRound className="w-6 h-6 text-teal-700" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('auth.forgotTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-xs mx-auto">
              {t('auth.forgotDescription')}
            </p>
          </div>

          {isSubmitted ? (
            /* Success State */
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-emerald-900">
                  {t('auth.resetSentTitle')}
                </h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {t('auth.resetSentDescription')}
                </p>
              </div>

              <div className="text-center">
                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('auth.backLogin')}</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label 
                  htmlFor="resetEmail" 
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  {t('auth.registeredEmail')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="resetEmail"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder={t('auth.emailPlaceholder')}
                    className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      error 
                        ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30' 
                        : 'border-slate-200 focus:ring-teal-500'
                    }`}
                  />
                </div>
                {error && (
                  <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{error}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-slate-900 via-blue-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>{t('auth.sendingReset')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('auth.sendReset')}</span>
                    <ArrowRight className="w-4 h-4 text-teal-300" />
                  </>
                )}
              </button>

              <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
                <span>{t('auth.rememberPassword')} </span>
                <Link 
                  to="/login" 
                  className="font-bold text-teal-700 hover:text-teal-800 hover:underline"
                >
                  {t('auth.backLogin')}
                </Link>
              </div>
            </form>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[11px] text-slate-400 border-t border-slate-200/60 bg-white">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>{t('auth.secureRecovery')}</span>
        </div>
      </footer>
    </div>
  );
}
