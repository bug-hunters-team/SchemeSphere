import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Compass, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Building2,
  UserPlus
} from 'lucide-react';
import { login } from '../services/authApi';
import { isValidEmail } from '../utils/validateEmail';
import LanguagePicker from '../components/LanguagePicker';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const prefilledEmail = location.state?.registeredEmail || '';
  const initialSuccess = location.state?.successMessage || '';

  const [formData, setFormData] = useState({
    email: prefilledEmail,
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [notRegisteredError, setNotRegisteredError] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t('auth.requiredEmail');
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = t('auth.invalidEmail');
    }

    if (!formData.password) {
      newErrors.password = t('auth.requiredPassword');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setNotRegisteredError(false);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (result.success) {
        if (formData.rememberMe) {
          localStorage.setItem('schemeSphereRememberMe', formData.email.trim());
        } else {
          localStorage.removeItem('schemeSphereRememberMe');
        }

        navigate('/dashboard');
      } else {
        setAuthError(result.status === 404 ? t('auth.accountNotFound') : t('auth.invalidCredentials'));
        if (result.notRegistered || result.status === 404) {
          setNotRegisteredError(true);
        }
        setIsLoading(false);
      }
    } catch {
      setAuthError(t('auth.unexpectedError'));
      setIsLoading(false);
    }
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
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm hover:shadow transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('auth.backHome')}</span>
        </Link>
        <LanguagePicker />
      </header>

      {/* Main Login Card Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-6 sm:p-8">
          
          {/* Card Branding & Heading */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mx-auto mb-3 shadow-sm">
              <Building2 className="w-6 h-6 text-teal-700" />
            </div>

            {/* Step Guidance Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-semibold mb-2">
              <span>{t('auth.loginBadge')}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('auth.welcome')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto">
              {t('auth.loginDescription')}
            </p>
          </div>

          {/* Success Banner (e.g. from registration) */}
          {initialSuccess && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{initialSuccess === 'registered' ? t('auth.registrationSuccess') : initialSuccess}</span>
            </div>
          )}

          {/* Error Banner */}
          {authError && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex flex-col gap-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{authError}</span>
              </div>

              {notRegisteredError && (
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-white bg-rose-700 hover:bg-rose-800 px-3 py-1.5 rounded-lg shadow-sm mt-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{t('auth.registerFirstLong')}</span>
                </Link>
              )}

            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                    if (authError) setAuthError('');
                  }}
                  placeholder={t('auth.emailPlaceholder')}
                  className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.email 
                      ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30' 
                      : 'border-slate-200 focus:ring-teal-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="password" 
                  className="block text-xs font-bold text-slate-700"
                >
                  {t('auth.password')}
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline"
                >
                  {t('auth.forgot')}
                </Link>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: '' });
                    if (authError) setAuthError('');
                  }}
                  placeholder={t('auth.passwordPlaceholder')}
                  className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.password 
                      ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30' 
                      : 'border-slate-200 focus:ring-teal-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-600 font-medium">{t('auth.remember')}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-slate-900 via-blue-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>{t('auth.signingIn')}</span>
                </>
              ) : (
                <>
                  <span>{t('auth.signIn')}</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </>
              )}
            </button>
          </form>

          {/* First-time registration reminder */}
          <div className="mt-5 p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-center">
            <p className="text-xs text-blue-900 font-semibold">
              {t('auth.newAccount')}
            </p>
            <p className="text-[11px] text-blue-700 mt-0.5">
              {t('auth.registerReminder')}
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm"
            >
              <UserPlus className="w-3.5 h-3.5 text-teal-300" />
              <span>{t('auth.registerFirst')}</span>
            </Link>
          </div>

          {/* Register Footer Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>{t('auth.newTo')} </span>
            <Link 
              to="/register" 
              className="font-bold text-teal-700 hover:text-teal-800 hover:underline"
            >
              {t('auth.registerHere')}
            </Link>
          </div>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-4 text-center text-[11px] text-slate-400 border-t border-slate-200/60 bg-white">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>{t('auth.secureLogin')}</span>
        </div>
      </footer>
    </div>
  );
}
