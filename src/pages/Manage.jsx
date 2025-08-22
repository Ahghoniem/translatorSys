import CategoryManager from "../components/CategoryManager.jsx";
import TranslationManager from "../components/TranslationManager.jsx";
import ImportExcel from "../components/ImportExcel.jsx";

export default function Manage(props) {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    translations,
    addTranslation,
    updateTranslation,
    deleteTranslation,
    deleteTranslationsByCategory,
  } = props;

  return (
    <>
      <CategoryManager
        categories={categories}
        addCategory={addCategory}
        updateCategory={updateCategory}
        deleteCategory={deleteCategory}
        onCascadeDelete={deleteTranslationsByCategory}
      />

      <TranslationManager
        categories={categories}
        translations={translations}
        addTranslation={addTranslation}
        updateTranslation={updateTranslation}
        deleteTranslation={deleteTranslation}
      />

      <ImportExcel

        addTranslation={addTranslation}
        categories={categories}
        addCategory={addCategory}
        translations={translations}
      />
    </>
  );
}
