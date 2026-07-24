'use client';

import React, { useState } from 'react';
import { useI18n } from '@/i18n/I18nContext';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const { t } = useI18n();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto my-6">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-12 pr-28 py-3.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/70 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all backdrop-blur-md shadow-md"
          disabled={isLoading}
        />
        <Search className="absolute left-4 w-5 h-5 text-slate-400" />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all shadow-md active:scale-95"
        >
          {isLoading ? '...' : t('searchButton')}
        </button>
      </div>
    </form>
  );
};
