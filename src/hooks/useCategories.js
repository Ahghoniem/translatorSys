// import { useLocalStorage } from "./useLocalStorage.js";

// export function useCategories() {
//   const [categories, setCategories] = useLocalStorage("categories", []);

//  const addCategory = (name) => {
//   const id = crypto.randomUUID();
//   const newCategory = { id, name };
//   setCategories([...categories, newCategory]);
//   return newCategory;
// };

//   const updateCategory = (id, name) => {
//     setCategories(categories.map((c) => (c.id === id ? { ...c, name } : c)));
//   };

//   const deleteCategory = (id) => {
//     setCategories(categories.filter((c) => c.id !== id));
//   };

//   return { categories, addCategory , updateCategory, deleteCategory };
// }

// useCategories.js
import { useLocalStorage } from "./useLocalStorage.js";

export function useCategories() {
  const [categories, setCategories] = useLocalStorage("categories", []);

  const addCategory = (name) => {
    if (!name) return null; // reject empty

    // check duplicate (case-insensitive)
    const exists = categories.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if ( exists)  return null;

    const id = crypto.randomUUID();
    const newCategory = { id, name };
    setCategories((prev) => [...prev, newCategory]);

    return newCategory;
  };

  const updateCategory = (id, name) => {
    // prevent updating to an existing name
    const exists = categories.some(
      (c) => c.id !== id && c.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) return null;

    setCategories(categories.map((c) => (c.id === id ? { ...c, name } : c)));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return { categories, addCategory, updateCategory, deleteCategory };
}
