import { useLocalStorage } from "./useLocalStorage.js";

export function useTranslations() {
  const [translations, setTranslations] = useLocalStorage("translations", []);

  const addTranslation = ({ expression, word, categoryId }) => {
    if (!expression || !word || !categoryId) return null; 

    const exists = translations.some(
      (t) =>
        t.expression.toLowerCase() === expression.toLowerCase() &&
        t.categoryId === categoryId
    );
    if (exists) return null;

    const id = crypto.randomUUID();
    const today = new Date();
    const startDate = today.toISOString().slice(0, 10);
    const newTranslation = { id, expression, word, categoryId, startDate };

    setTranslations((prev) => [...prev, newTranslation]);
    return newTranslation;
  };

  const updateTranslation = (id, patch) => {
    setTranslations(
      translations.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  };

  const deleteTranslation = (id) => {
    setTranslations(translations.filter((t) => t.id !== id));
  };

  const deleteTranslationsByCategory = (categoryId) => {
    setTranslations(translations.filter((t) => t.categoryId !== categoryId));
  };

  return {
    translations,
    addTranslation,
    updateTranslation,
    deleteTranslation,
    deleteTranslationsByCategory,
  };
}
