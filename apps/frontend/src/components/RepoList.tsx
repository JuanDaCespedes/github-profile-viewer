'use client';

import React from 'react';
import { RepositorySummary } from '@/types/profile';
import { useI18n } from '@/i18n/I18nContext';
import { Star, GitFork, ExternalLink, Code } from 'lucide-react';

interface RepoListProps {
  repositories: RepositorySummary[];
}

export const RepoList: React.FC<RepoListProps> = ({ repositories }) => {
  const { t } = useI18n();

  if (!repositories || repositories.length === 0) {
    return null;
  }

  return (
    <section className="w-full space-y-4 pt-4">
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <span>{t('repositoriesTitle')}</span>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-mono">
          {repositories.length}
        </span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {repositories.map((repo) => (
          <article
            key={repo.name}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-sky-500/40 transition-colors shadow-sm group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate flex items-center gap-1.5 text-sm sm:text-base"
                >
                  <span className="truncate">{repo.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">
                {repo.description || t('noDescription')}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-4">
              <div className="flex items-center gap-3">
                {repo.language && (
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                    <Code className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                  {repo.stargazersCount}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {repo.forksCount}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {new Date(repo.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
