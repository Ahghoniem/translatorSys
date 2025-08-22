import { useLocalStorage } from "./useLocalStorage.js";


export function useTranslations(){
const [translations, setTranslations] = useLocalStorage("translations", []);


const addTranslation = ({ expression, word, categoryId }) => {
const id = crypto.randomUUID();
const today = new Date();
const startDate = today.toISOString().slice(0,10); // YYYY-MM-DD
setTranslations([...translations, { id, expression, word, categoryId, startDate }]);
};


const updateTranslation = (id, patch) => {
setTranslations(translations.map(t => t.id === id ? { ...t, ...patch } : t));
};


const deleteTranslation = (id) => {
setTranslations(translations.filter(t => t.id !== id));
};


const deleteTranslationsByCategory = (categoryId) => {
setTranslations(translations.filter(t => t.categoryId !== categoryId));
};


return { translations, addTranslation, updateTranslation, deleteTranslation, deleteTranslationsByCategory };
}