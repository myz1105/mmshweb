import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook to ensure consistent language between server and client during hydration
 * Returns the language that should be used for initial render
 */
export const useHydrationSafeLanguage = () => {
  const { i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [safeLanguage, setSafeLanguage] = useState('en');

  useEffect(() => {
    // This runs only on client after hydration
    setIsClient(true);
    setSafeLanguage(i18n.language || 'en');
  }, [i18n.language]);

  // During SSR and initial hydration, use 'en' as fallback
  // After hydration, use the actual detected language
  return isClient ? safeLanguage : 'en';
};
