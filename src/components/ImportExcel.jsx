import React, { useRef } from "react";
import { useExcelImport } from "../hooks/useExcelImport";

export default function ImportExcel({
  addTranslation,
  categories,
  addCategory,
  translations,
}) {
  const fileInputRef = useRef(null);
  const { parseExcelFile } = useExcelImport();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    parseExcelFile(file, (rows) => {
      const categoryCache = {}; 

      rows.forEach((row) => {
        const expression = row.Expression?.trim();
        const word = row.Word?.trim();
        const categoryName = row.Category?.trim();
        if (!expression || !word || !categoryName) return;

        let categoryObj =
          categoryCache[categoryName] ||
          categories.find(
            (c) => c.name.toLowerCase() === categoryName.toLowerCase()
          );

        if (!categoryObj) {
          categoryObj = addCategory(categoryName); 
        }

        if (categoryObj) {
          categoryCache[categoryName] = categoryObj;
        }

        const alreadyExists = translations.find(
          (t) =>
            t.expression.toLowerCase() === expression.toLowerCase() &&
            t.categoryId === categoryObj.id
        );
        if (alreadyExists) {
          console.warn(`Skipped duplicate expression: ${expression}`);
          return;
        }

        addTranslation({
          expression,
          word,
          categoryId: categoryObj.id,
        });
      });

      e.target.value = "";
    });
  };

  return (
    <div className="card">
      <h2>Import Excel</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      <button
        className="btn primary"
        onClick={() => fileInputRef.current.click()}
      >
        Upload Excel File
      </button>
    </div>
  );
}
