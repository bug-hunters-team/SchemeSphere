import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Compass, 
  LogOut, 
  User, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  SlidersHorizontal,
  RefreshCw,
  Search,
  Phone,
  Save,
  Pencil,
  X,
  Check,
  Heart
} from 'lucide-react';
import { sampleSchemes } from '../data/schemesData';
import SchemeModal from '../components/SchemeModal';
import { updateProfile } from '../services/authApi';
import LanguagePicker from '../components/LanguagePicker';

const profileStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

const profileInterests = [
  'Agriculture',
  'Education',
  'Healthcare',
  'Employment',
  'Women Empowerment',
  'Housing',
  'Financial Assistance',
  'Social Welfare',
];
const interestTranslationKeys = {
  Agriculture: 'agriculture',
  Education: 'education',
  Healthcare: 'healthcare',
  Employment: 'employment',
  'Women Empowerment': 'women',
  Housing: 'housing',
  'Financial Assistance': 'financial',
  'Social Welfare': 'social',
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const userJson = localStorage.getItem('schemeSphereUser');
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  });
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [profileDraft, setProfileDraft] = useState(() => ({
    name: currentUser?.name || '',
    state: currentUser?.state || '',
    district: currentUser?.district || '',
    phone: currentUser?.phone || '',
    interests: Array.isArray(currentUser?.interests) ? currentUser.interests : [],
  }));
  const [profileError, setProfileError] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(() => !currentUser?.profileCompleted);

  // Live Interactive Profile Filter for AI Eligibility Matcher
  const [selectedOccupation, setSelectedOccupation] = useState('All');
  const [selectedIncome, setSelectedIncome] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('schemeSphereUser');
    setCurrentUser(null);
    navigate('/login');
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();
    setProfileError('');
    setProfileMessage('');
    setIsSavingProfile(true);

    const result = await updateProfile(profileDraft);
    if (result.success && result.user) {
      setCurrentUser(result.user);
      setProfileDraft({
        name: result.user.name || '',
        state: result.user.state || '',
        district: result.user.district || '',
        phone: result.user.phone || '',
        interests: result.user.interests || [],
      });
      setProfileMessage(t('dashboard.saved'));
      setIsEditingProfile(false);
    } else {
      setProfileError(t('dashboard.saveError'));
    }
    setIsSavingProfile(false);
  };

  const handleProfileEdit = () => {
    setProfileDraft({
      name: currentUser.name || '',
      state: currentUser.state || '',
      district: currentUser.district || '',
      phone: currentUser.phone || '',
      interests: Array.isArray(currentUser.interests) ? currentUser.interests : [],
    });
    setProfileError('');
    setProfileMessage('');
    setIsEditingProfile(true);
  };

  const handleProfileCancel = () => {
    setProfileDraft({
      name: currentUser.name || '',
      state: currentUser.state || '',
      district: currentUser.district || '',
      phone: currentUser.phone || '',
      interests: Array.isArray(currentUser.interests) ? currentUser.interests : [],
    });
    setProfileError('');
    setProfileMessage('');
    setIsEditingProfile(false);
  };

  const handleProfileEditClick = () => {
    if (!isEditingProfile) {
      handleProfileEdit();
      return;
    }

    document.getElementById('profileState')?.focus();
  };

  if (!currentUser) return null;

  const isPersonalizedMatch = (scheme) => (
    (profileDraft.interests.length > 0 && profileDraft.interests.includes(scheme.category))
    || (profileDraft.state && scheme.state === profileDraft.state)
  );
  const profileCompletion = [
    Boolean(currentUser.state),
    Boolean(currentUser.interests?.length),
  ].filter(Boolean).length;

  // Keep the full set of schemes visible and rank preference matches first.
  const matchedSchemes = sampleSchemes.filter((scheme) => {
    let matchesOcc = true;
    if (selectedOccupation === 'Farmer') {
      matchesOcc = scheme.category === 'Agriculture' || scheme.name.includes('Kisan');
    } else if (selectedOccupation === 'Student') {
      matchesOcc = scheme.category === 'Education';
    } else if (selectedOccupation === 'Entrepreneur') {
      matchesOcc = scheme.category === 'Employment' || scheme.category === 'Financial Assistance';
    }

    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.benefit.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesOcc && matchesSearch;
  }).sort((a, b) => Number(isPersonalizedMatch(b)) - Number(isPersonalizedMatch(a)));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-teal-500 selection:text-white">
      
      {/* Dashboard Header Bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-teal-600 flex items-center justify-center text-white shadow-sm">
                <Compass className="w-4 h-4 text-teal-300" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                Scheme<span className="text-teal-600">Sphere</span>
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              {t('dashboard.finder')}
            </span>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors hidden md:inline-block"
            >
              {t('auth.backHome')}
            </Link>

            <LanguagePicker />

            {/* User Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
              <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate">
                {currentUser.name}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
              title={t('dashboard.logoutTitle')}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('dashboard.logout')}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8 w-full">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-teal-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('dashboard.finder')}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t('dashboard.greeting', { name: currentUser.name })}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {t('dashboard.allIndia')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-left">
                <span className="text-[10px] text-teal-300 uppercase tracking-wider block font-semibold">{t('dashboard.state')}</span>
                <span className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  {currentUser.state || t('dashboard.selectState')}
                </span>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-left">
                <span className="text-[10px] text-teal-300 uppercase tracking-wider block font-semibold">{t('dashboard.category')}</span>
                <span className="text-sm font-bold text-white block mt-0.5">
                  {currentUser.category || t('dashboard.notSpecified')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quick Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>{t('dashboard.schemesShown')}</span>
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{matchedSchemes.length} {t('dashboard.active')}</div>
            <p className="text-[11px] text-teal-700 font-medium mt-1">{t('dashboard.filtersHint')}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>{t('dashboard.estimatedBenefits')}</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">₹11,000+</div>
            <p className="text-[11px] text-slate-500 mt-1">{t('dashboard.benefitsHint')}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>{t('dashboard.applications')}</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t('dashboard.noApplications')}</div>
            <p className="text-[11px] text-blue-700 font-medium mt-1">PM-KISAN</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>{t('dashboard.personalization')}</span>
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{profileCompletion} / 2</div>
            <p className="text-[11px] text-teal-700 font-medium mt-1">{t('dashboard.completeProfile')}</p>
          </div>

        </div>

        {/* AI Eligibility Finder Filter Controls */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{t('dashboard.engine')}</h3>
                <p className="text-xs text-slate-500">{t('dashboard.fineTune')}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedOccupation('All');
                setSelectedIncome('All');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t('dashboard.reset')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('dashboard.search')}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Occupation Filter */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedOccupation}
                onChange={(e) => setSelectedOccupation(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-slate-700"
              >
                <option value="All">{t('dashboard.allOccupations')}</option>
                <option value="Farmer">{t('dashboard.farmer')}</option>
                <option value="Student">{t('dashboard.student')}</option>
                <option value="Entrepreneur">{t('dashboard.entrepreneur')}</option>
              </select>
            </div>

            {/* Annual Income Filter */}
            <div>
              <select
                value={selectedIncome}
                onChange={(e) => setSelectedIncome(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-slate-700"
              >
                <option value="All">{t('dashboard.incomeAny')}</option>
                <option value="Below1L">{t('dashboard.below1L')}</option>
                <option value="1L-2.5L">{t('dashboard.income1to25')}</option>
                <option value="2.5L-5L">{t('dashboard.income25to5')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recommended Schemes Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {t('dashboard.governmentSchemes', { count: matchedSchemes.length })}
              </h2>
              <p className="text-xs text-slate-500">
                {t('dashboard.allIndia')}
              </p>
            </div>

            <Link
              to="/#schemes"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1"
            >
              <span>{t('dashboard.exploreAll')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className={`bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                  isPersonalizedMatch(scheme) ? 'border-teal-400 ring-1 ring-teal-100' : 'border-slate-200/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
                      <Tag className="w-3 h-3 text-teal-600" />
                      {t(`categories.${scheme.category === 'Financial Assistance' ? 'financial' : scheme.category.toLowerCase()}`)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                      <Building2 className="w-3 h-3" />
                      {t(`scheme.${scheme.level === 'Central Sector' ? 'centralSector' : 'centrallySponsored'}`)}
                    </span>
                  </div>

                  {isPersonalizedMatch(scheme) && (
                    <span className="inline-flex items-center gap-1 mb-2 px-2 py-1 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold">
                      <Check className="w-3 h-3" />
                      {scheme.state === profileDraft.state
                        ? t('dashboard.forState', { state: profileDraft.state })
                        : t('dashboard.matchesInterests')}
                    </span>
                  )}

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {scheme.name}
                  </h3>

                  <div className="my-2.5 p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 text-xs font-semibold">
                    {scheme.benefit}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {scheme.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {t('dashboard.eligibilityNote')}
                  </span>

                  <button
                    onClick={() => setSelectedScheme(scheme)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-teal-700 rounded-lg transition-colors"
                  >
                    <span>{t('dashboard.view')}</span>
                    <ArrowRight className="w-3 h-3 text-teal-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {matchedSchemes.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">{t('dashboard.empty')}</p>
              <button
                onClick={() => {
                  setSelectedOccupation('All');
                  setSelectedIncome('All');
                  setSearchQuery('');
                }}
                className="mt-2 text-xs font-bold text-teal-700 hover:underline"
              >
                {t('dashboard.resetAll')}
              </button>
            </div>
          )}
        </div>

        <section id="profile" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-teal-700 mb-2">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide">{t('dashboard.profile')}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {t('dashboard.personalize')}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {t('dashboard.profileDescription')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {t('dashboard.profileCompletion', { count: profileCompletion })}
              </span>
              <button
                type="button"
                onClick={handleProfileEditClick}
                aria-label={t('dashboard.edit')}
                title={t('dashboard.edit')}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isEditingProfile && currentUser.profileCompleted ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">{t('dashboard.name')}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{currentUser.name}</p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">{t('dashboard.email')}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900 break-all">{currentUser.email}</p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">{t('dashboard.stateLabel')}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{currentUser.state}</p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">{t('dashboard.district')}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{currentUser.district || t('dashboard.notProvided')}</p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-500">{t('dashboard.mobile')}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{currentUser.phone || t('dashboard.notProvided')}</p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:col-span-2">
                  <p className="text-xs font-semibold text-slate-500">{t('dashboard.interests')}</p>
                  {currentUser.interests?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {currentUser.interests.map((interest) => (
                        <span key={interest} className="rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-semibold text-teal-800">
                          {t(`categories.${interestTranslationKeys[interest]}`)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm font-bold text-slate-900">{t('dashboard.noInterests')}</p>
                  )}
                </div>
              </div>

              {profileMessage && <p role="status" className="text-sm font-medium text-emerald-700">{profileMessage}</p>}

            </div>
          ) : (
          <form onSubmit={handleProfileSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profileName" className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('dashboard.name')}
                </label>
                <input
                  id="profileName"
                  required
                  maxLength={100}
                  value={profileDraft.name}
                  onChange={(event) => setProfileDraft({ ...profileDraft, name: event.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label htmlFor="profileEmail" className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('dashboard.email')}
                </label>
                <input
                  id="profileEmail"
                  type="email"
                  value={currentUser.email}
                  readOnly
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-600"
                />
              </div>
              <div>
                <label htmlFor="profileState" className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('dashboard.stateLabel')}
                </label>
                <select
                  id="profileState"
                  required
                  value={profileDraft.state}
                  onChange={(event) => setProfileDraft({ ...profileDraft, state: event.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">{t('dashboard.selectState')}</option>
                  {profileStates.map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="profileDistrict" className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('dashboard.district')} <span className="font-normal text-slate-400">{t('dashboard.optional')}</span>
                </label>
                <input
                  id="profileDistrict"
                  maxLength={100}
                  value={profileDraft.district}
                  onChange={(event) => setProfileDraft({ ...profileDraft, district: event.target.value })}
                  placeholder={t('dashboard.yourDistrict')}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="profilePhone" className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {t('dashboard.mobile')} <span className="font-normal text-slate-400">{t('dashboard.optional')}</span>
                </label>
                <input
                  id="profilePhone"
                  type="tel"
                  value={profileDraft.phone}
                  onChange={(event) => setProfileDraft({ ...profileDraft, phone: event.target.value })}
                  placeholder={t('dashboard.phonePlaceholder')}
                  className="w-full sm:max-w-md px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <p className="mt-1 text-xs text-slate-500">{t('dashboard.phoneHelp')}</p>
              </div>
            </div>

            <fieldset>
              <legend className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                {t('dashboard.interests')} <span className="font-normal text-slate-400">{t('dashboard.optional')}</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {profileInterests.map((interest) => {
                  const isSelected = profileDraft.interests.includes(interest);
                  return (
                    <label
                      key={interest}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-teal-300 bg-teal-50 text-teal-800'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          const interests = isSelected
                            ? profileDraft.interests.filter((item) => item !== interest)
                            : [...profileDraft.interests, interest];
                          setProfileDraft({ ...profileDraft, interests });
                        }}
                        className="sr-only"
                      />
                      {isSelected && <Check className="w-3 h-3" />}
                      {t(`categories.${interestTranslationKeys[interest]}`)}
                    </label>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {t('dashboard.aadhaarNote')}
              </p>
            </fieldset>

            {profileError && <p role="alert" className="text-sm font-medium text-rose-700">{profileError}</p>}
            {profileMessage && <p role="status" className="text-sm font-medium text-emerald-700">{profileMessage}</p>}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSavingProfile}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                {isSavingProfile ? t('dashboard.saving') : t('dashboard.save')}
              </button>
              {currentUser.profileCompleted && (
                <button
                  type="button"
                  onClick={handleProfileCancel}
                  disabled={isSavingProfile}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                  <X className="w-4 h-4" />
                  {t('dashboard.cancel')}
                </button>
              )}
            </div>
          </form>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="py-5 text-center text-xs text-slate-400 bg-white border-t border-slate-200/80 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{t('dashboard.footer')}</span>
          <Link to="/" className="text-teal-700 font-semibold hover:underline">
            {t('dashboard.backPortal')}
          </Link>
        </div>
      </footer>

      {/* Modal Dialog for Scheme View Details */}
      {selectedScheme && (
        <SchemeModal 
          scheme={selectedScheme} 
          onClose={() => setSelectedScheme(null)} 
        />
      )}

    </div>
  );
}
