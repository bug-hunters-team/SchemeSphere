import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function OtpInput({ 
  value = ['', '', '', '', '', ''], 
  onChange, 
  disabled = false,
  hasError = false 
}) {
  const inputRefs = useRef([]);
  const { t } = useTranslation();

  // Auto-focus the first input on initial mount
  useEffect(() => {
    if (!disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    
    // Accept only digits
    const lastChar = val.slice(-1);
    if (val && !/^\d+$/.test(lastChar)) {
      return;
    }

    const newOtp = [...value];
    newOtp[index] = lastChar;
    onChange(newOtp);

    // Auto-advance focus to next input if digit entered
    if (lastChar && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace handling: move focus back if current is empty or cleared
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0 && inputRefs.current[index - 1]) {
        e.preventDefault();
        const newOtp = [...value];
        newOtp[index - 1] = '';
        onChange(newOtp);
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0 && inputRefs.current[index - 1]) {
      e.preventDefault();
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5 && inputRefs.current[index + 1]) {
      e.preventDefault();
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    // Keep only numbers
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (digits.length === 0) return;

    const newOtp = [...value];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = digits[i] || '';
    }
    onChange(newOtp);

    // Focus the box matching length of pasted digits
    const nextIndex = Math.min(digits.length, 5);
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete="one-time-code"
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-extrabold font-mono rounded-xl border transition-all select-none ${
            hasError
              ? 'border-rose-300 bg-rose-50/50 text-rose-900 focus:ring-2 focus:ring-rose-400 focus:border-rose-400'
              : value[index]
              ? 'border-teal-500 bg-teal-50/30 text-slate-900 ring-1 ring-teal-500/20'
              : 'border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
          } ${
            disabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''
          }`}
          aria-label={t('auth.digitOf', { index: index + 1 })}
        />
      ))}
    </div>
  );
}
