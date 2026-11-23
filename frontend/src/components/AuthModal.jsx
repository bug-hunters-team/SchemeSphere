import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  Compass, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function AuthModal({ mode = 'register', onClose, onComplete }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(mode);
  const [submitted, setSubmitted] = useState(false);
  
  // Demo profile form state
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    state: 'Maharashtra',
    occupation: 'farmer',
    income: '1to25',
    category: 'General / OBC'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onComplete) onComplete();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-10"
          aria-label={t('scheme.close')}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-900 to-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-900/10 mb-3">
            <Compass className="w-6 h-6 text-teal-300" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-900">
            {activeTab === 'login' ? t('modal.welcome') : t('modal.profile')}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {activeTab === 'login' 
              ? t('modal.savedSchemes')
              : t('modal.demoDetails')}
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-2 mt-4 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('modal.check')}
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('modal.citizenLogin')}
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">{t('modal.matched')}</h4>
              <p className="text-xs text-slate-500">
                {t('modal.matchDescription')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'login' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('modal.mobileOrId')}
                    </label>
                    <input
                      type="text"
                      defaultValue="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('auth.password')}
                    </label>
                    <input
                      type="password"
                      defaultValue="••••••••"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('auth.fullName')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t('modal.state')}
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option>Maharashtra</option>
                        <option>Uttar Pradesh</option>
                        <option>Tamil Nadu</option>
                        <option>Karnataka</option>
                        <option>Gujarat</option>
                        <option>West Bengal</option>
                        <option>Bihar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t('modal.occupation')}
                      </label>
                      <select
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="farmer">{t('modal.occupationFarmer')}</option>
                        <option value="student">{t('modal.occupationStudent')}</option>
                        <option value="women">{t('modal.occupationWomen')}</option>
                        <option value="informal">{t('modal.occupationInformal')}</option>
                        <option value="salaried">{t('modal.occupationSalaried')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('modal.income')}
                    </label>
                    <select
                      value={formData.income}
                      onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="below1">{t('modal.incomeBelow')}</option>
                      <option value="1to25">{t('modal.income1to25')}</option>
                      <option value="25to5">{t('modal.income25to5')}</option>
                      <option value="above5">{t('modal.incomeAbove')}</option>
                    </select>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 py-3 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-teal-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{activeTab === 'login' ? t('modal.loginSecurely') : t('modal.match')}</span>
                <ArrowRight className="w-4 h-4 text-teal-300" />
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('modal.privacy')}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
