// ============================================================
// useTranslation hook – reads language from context and returns t()
// ============================================================
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';

export function useTranslation() {
  const { language } = useApp();
  return {
    t: (key) => t(language, key),
    language,
  };
}
