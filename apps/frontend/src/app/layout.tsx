import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/i18n/I18nContext';
import { ThemeProvider } from '@/theme/ThemeContext';

export const metadata: Metadata = {
  title: 'GitHub Profile Viewer',
  description: 'Explora perfiles de GitHub, métricas y repositorios públicos mediante NestJS + Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased selection:bg-sky-500/30 selection:text-sky-200">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
