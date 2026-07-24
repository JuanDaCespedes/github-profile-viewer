'use client';

import React from 'react';
import { useI18n } from '@/i18n/I18nContext';
import { Languages } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div className="flex items-center space-x-1.5 bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/80 dark:border-slate-700/60 rounded-full px-3 py-1.5 backdrop-blur-md">
      <Languages className="w-4 h-4 text-sky-500 dark:text-sky-400" />
      <button
        onClick={() => setLanguage('es')}
        className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all ${
          language === 'es'
            ? 'bg-sky-500 text-white shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all ${
          language === 'en'
            ? 'bg-sky-500 text-white shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        EN
      </button>
    </div>
  );
};
