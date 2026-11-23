import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n/i18n';

export default function LanguagePicker() {
  const { i18n, t } = useTranslation();

  return (
    <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600">
      <span>{t('nav.language')}</span>
      <select
        aria-label={t('nav.selectLanguage')}
        value={i18n.resolvedLanguage}
        onChange={(event) => i18n.changeLanguage(event.target.value)}
        className="max-w-28 bg-transparent font-semibold text-slate-800 focus:outline-none"
      >
        {supportedLanguages.map(({ code, native }) => (
          <option key={code} value={code}>{native}</option>
        ))}
      </select>
    </label>
  );
}
