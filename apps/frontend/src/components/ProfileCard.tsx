'use client';

import React from 'react';
import { UserProfile } from '@/types/profile';
import { useI18n } from '@/i18n/I18nContext';
import { MapPin, Building, Link as LinkIcon, ExternalLink, Users, BookOpen } from 'lucide-react';

interface ProfileCardProps {
  profile: UserProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { t } = useI18n();

  return (
    <article className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        <img
          src={profile.avatarUrl}
          alt={`Avatar de ${profile.username}`}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-sky-500/30 object-cover shadow-sm"
        />

        <div className="flex-1 space-y-2 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                {profile.name || profile.username}
              </h2>
              <p className="text-sky-600 dark:text-sky-400 font-mono text-sm">@{profile.username}</p>
            </div>
            <a
              href={profile.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-sky-600 dark:text-sky-400 text-xs font-semibold rounded-xl transition-colors shadow-sm"
            >
              <span>{t('viewGithubProfile')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xl">
            {profile.bio || t('noDescription')}
          </p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
            {profile.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>{profile.location}</span>
              </span>
            )}
            {profile.company && (
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>{profile.company}</span>
              </span>
            )}
            {profile.blog && (
              <a
                href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:underline"
              >
                <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{profile.blog}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center">
        <div className="space-y-1">
          <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs flex items-center justify-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>{t('publicRepos')}</span>
          </p>
          <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">{profile.publicRepos}</p>
        </div>
        <div className="space-y-1 border-x border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs flex items-center justify-center gap-1">
            <Users className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>{t('followers')}</span>
          </p>
          <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">{profile.followers}</p>
        </div>
        <div className="space-y-1">
          <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs flex items-center justify-center gap-1">
            <Users className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>{t('following')}</span>
          </p>
          <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">{profile.following}</p>
        </div>
      </div>
    </article>
  );
};
