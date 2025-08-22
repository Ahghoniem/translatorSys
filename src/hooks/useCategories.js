import { useLocalStorage } from "./useLocalStorage.js";


export function useCategories(){
const [categories, setCategories] = useLocalStorage("categories", []);


const addCategory = (name) => {
const id = crypto.randomUUID();
setCategories([...categories, { id, name }]);
};


const updateCategory = (id, name) => {
setCategories(categories.map(c => c.id === id ? { ...c, name } : c));
};


const deleteCategory = (id) => {
setCategories(categories.filter(c => c.id !== id));
// optional: also remove translations for this category in UI (handled in TranslationManager)
};


return { categories, addCategory, updateCategory, deleteCategory };
}