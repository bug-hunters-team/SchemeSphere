import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Compass, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { register } from '../services/authApi';
import { isValidEmail } from '../utils/validateEmail';
import LanguagePicker from '../components/LanguagePicker';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('auth.validName');
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = t('auth.requiredEmail');
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = t('auth.invalidEmail');
    }

    // Password: min 8 characters
    if (!formData.password) {
      newErrors.password = t('auth.requiredPassword');
    } else if (formData.password.length < 8) {
      newErrors.password = t('auth.shortPassword');
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.requiredConfirm');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordMismatch');
    }

    // Terms
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = t('auth.requiredTerms');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (result.success) {
        navigate('/login', {
          state: {
            registeredEmail: formData.email.trim(),
            successMessage: 'registered',
          }
        });
      } else {
        if (result.status === 409) {
          setErrors({ email: t('auth.duplicateEmail'), form: t('auth.duplicateEmail') });
        } else {
          setErrors({ form: t('auth.unexpectedError') });
        }
        setIsLoading(false);
      }
    } catch {
      setErrors({ form: t('auth.unexpectedError') });
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

      {/* Main Registration Card Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-6 sm:p-8">
          
          {/* Card Branding & Heading */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mx-auto mb-3 shadow-sm">
              <Sparkles className="w-6 h-6 text-teal-700" />
            </div>
            
            {/* Step Guidance Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-semibold mb-2">
              <span>{t('auth.registration')}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('auth.createAccount')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {t('auth.registrationDescription')}
            </p>
          </div>

          {/* Error Banner */}
          {errors.form && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            {/* Full Name Field */}
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                {t('auth.fullName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder="e.g. Ramesh Kumar"
                  className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.fullName 
                      ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30' 
                      : 'border-slate-200 focus:ring-teal-500'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Email Address Field */}
            <div>
              <label 
                htmlFor="registerEmail" 
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="registerEmail"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
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

            {/* Password & Confirm Password Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Password */}
              <div>
                <label 
                  htmlFor="registerPassword" 
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="registerPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    placeholder={t('auth.minPassword')}
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

              {/* Confirm Password */}
              <div>
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  {t('auth.confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    placeholder={t('auth.reenterPassword')}
                    className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                      errors.confirmPassword 
                        ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30' 
                        : 'border-slate-200 focus:ring-teal-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showConfirmPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>

            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-1">
              <div className="flex items-start gap-2.5 select-none">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  readOnly
                  aria-label={t('auth.terms')}
                  onClick={(event) => {
                    event.preventDefault();
                    if (formData.agreeTerms) {
                      setFormData({ ...formData, agreeTerms: false });
                    } else {
                      setIsTermsOpen(true);
                    }
                  }}
                  className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 mt-0.5"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  {t('auth.acceptTermsPrefix')}{' '}
                  <button
                    type="button"
                    onClick={() => setIsTermsOpen(true)}
                    className="font-semibold text-teal-700 underline hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                  >
                    {t('auth.terms')}
                  </button>
                  {' '}{t('auth.termsConsent')}
                </span>
              </div>
              {errors.agreeTerms && (
                <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.agreeTerms}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-slate-900 via-blue-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>{t('auth.creating')}</span>
                </>
              ) : (
                <>
                  <span>{t('auth.create')}</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </>
              )}
            </button>
          </form>

          {/* Login Footer Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>{t('auth.alreadyVerified')} </span>
            <Link 
              to="/login" 
              className="font-bold text-teal-700 hover:text-teal-800 hover:underline"
            >
              {t('auth.loginHere')}
            </Link>
          </div>
        </div>
      </main>

      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 id="terms-title" className="text-xl font-bold text-slate-900">
              {t('auth.termsTitle')}
            </h2>
            <div className="mt-4 max-h-[55vh] space-y-3 overflow-y-auto text-sm leading-relaxed text-slate-600">
              <p>{t('auth.termsIntro')}</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>{t('auth.termOne')}</li>
                <li>{t('auth.termTwo')}</li>
                <li>{t('auth.termThree')}</li>
                <li>{t('auth.termFour')}</li>
                <li>{t('auth.termFive')}</li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsTermsOpen(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {t('auth.cancel')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, agreeTerms: true });
                  setErrors({ ...errors, agreeTerms: '' });
                  setIsTermsOpen(false);
                }}
                className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
              >
                {t('auth.agree')}
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Simple Footer */}
      <footer className="py-4 text-center text-[11px] text-slate-400 border-t border-slate-200/60 bg-white">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>{t('auth.secureRegistration')}</span>
        </div>
      </footer>
    </div>
  );
}
