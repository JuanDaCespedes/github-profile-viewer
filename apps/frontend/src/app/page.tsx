'use client';

import React, { useEffect, useState } from 'react';
import { UserProfile } from '@/types/profile';
import { ApiService } from '@/services/api.service';
import { ProfileCard } from '@/components/ProfileCard';
import { RepoList } from '@/components/RepoList';
import { SearchBar } from '@/components/SearchBar';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useI18n } from '@/i18n/I18nContext';
import { Github, AlertCircle } from 'lucide-react';

export default function Home() {
  const { t } = useI18n();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Default username requirement set to 'JuanDaCespedes'
  const DEFAULT_USERNAME = 'JuanDaCespedes';

  const loadProfile = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiService.fetchUserProfile(username);
      setProfile(data);
    } catch (err: any) {
      setError(err.message || t('errorLoading'));
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile(DEFAULT_USERNAME);
  }, []);

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12 max-w-4xl mx-auto flex flex-col justify-between">
      <div className="space-y-8">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl">
              <Github className="w-8 h-8 text-sky-500 dark:text-sky-400" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                {t('title')}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </header>

        <SearchBar onSearch={loadProfile} isLoading={loading} />

        {loading && (
          <div className="w-full glass-panel rounded-3xl p-8 space-y-6 animate-pulse">
            <div className="flex items-center gap-6">
              <div className="w-28 h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="w-full p-6 glass-panel rounded-2xl border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 shrink-0 text-red-500 dark:text-red-400" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {profile && !loading && (
          <div className="space-y-6">
            <ProfileCard profile={profile} />
            <RepoList repositories={profile.repositories} />
          </div>
        )}
      </div>

      <footer className="pt-12 text-center text-xs text-slate-500 border-t border-slate-200 dark:border-slate-900 mt-12">
        <p>GitHub Profile Viewer Monorepo &bull; NestJS 11 + Next.js 15 + Tailwind CSS v4</p>
      </footer>
    </main>
  );
}
