// import React from "react";
// import * as XLSX from "xlsx";

// export default function ImportExcel({
//   addTranslations,
//   categories,
//   setCategories,
// }) {
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = new Uint8Array(evt.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const rows = XLSX.utils.sheet_to_json(worksheet);

//       const newTranslations = [];
//       const newCategories = [...categories];

//       rows.forEach((row) => {
//         const Expression = row.Expression?.trim();
//         const Word = row.Word?.trim();
//         const Category = row.Category?.trim();

//         if (!Expression || !Word || !Category) return;

//         // Ensure category exists
//         let categoryObj = newCategories.find((c) => c.name === Category);
//         if (!newCategories.find((c) => c.name === Category)) {
//           newCategories.push({
//             id: crypto.randomUUID(),
//             name: Category,
//           });
//         }

//         newTranslations.push({
//           id: Date.now() + Math.random(),
//           expression: Expression,
//           word: Word,
//           categoryId: categoryObj.id,
//           startDate: new Date().toISOString(),
//         });
//       });

//       setCategories(newCategories);
//       addTranslations(newTranslations);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div className="card">
//       <h2>Import Excel</h2>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
//     </div>
//   );
// }

// import React from "react";
// import * as XLSX from "xlsx";

// export default function ImportExcel({
//   addTranslation,
//   categories,
//   setCategories,
// }) {
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = new Uint8Array(evt.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const rows = XLSX.utils.sheet_to_json(worksheet);

//       const newCategories = [...categories];

//       rows.forEach((row) => {
//         const Expression = row.Expression?.trim();
//         const Word = row.Word?.trim();
//         const Category = row.Category?.trim();

//         if (!Expression || !Word || !Category) return;

//         // Find or create category
//         let categoryObj = newCategories.find((c) => c.name === Category);
//         if (!categoryObj) {
//           categoryObj = {
//             id: crypto.randomUUID(),
//             name: Category,
//           };
//           newCategories.push(categoryObj);
//         }

//         // Add translation
//         addTranslation({
//           id: crypto.randomUUID(),
//           expression: Expression,
//           word: Word,
//           categoryId: categoryObj.id,
//           startDate: new Date().toISOString(),
//         });
//       });

//       setCategories(newCategories);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div className="card">
//       <h2>Import Excel</h2>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
//     </div>
//   );
// }
//=============================================

// import React, { useRef } from "react";
// import * as XLSX from "xlsx";

// export default function ImportExcel({
//   addTranslation,
//   categories,
//   setCategories,
// }) {
//   const fileInputRef = useRef(null);

//   const handleFileUpload = (e) => {
//     console.log("Test1")
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = new Uint8Array(evt.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const rows = XLSX.utils.sheet_to_json(worksheet);

//       const newCategories = [...categories];

//       rows.forEach((row) => {
//         const Expression = row.English?.trim();
//         const Word = row.Key?.trim();
//         const Category = row.Category?.trim();

//         if (!Expression || !Word || !Category) return;

//         let categoryObj = newCategories.find((c) => c.name === Category);
//         if (!categoryObj) {
//           categoryObj = {
//             id: crypto.randomUUID(),
//             name: Category,
//           };
//           newCategories.push(categoryObj);
//         }

//         // Add translation
//         addTranslation({
//           id: crypto.randomUUID(),
//           expression: Expression,
//           word: Word,
//           categoryId: categoryObj.id,
//           startDate: new Date().toISOString(),
//         });
//       });

//       setCategories(newCategories);

//       // reset input so the same file can be uploaded again if needed
//       e.target.value = "";
//     };

//     reader.readAsArrayBuffer(file);
//     console.log("Test2");

//   };

//   return (
//     <div className="card">
//       <h2>Import Excel</h2>

//       {/* Hidden file input */}
//       <input
//         type="file"
//         accept=".xlsx, .xls"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFileUpload}
//       />

//       {/* Button to trigger file picker */}
//       <button
//         className="btn primary"
//         onClick={() => fileInputRef.current.click()}
//       >
//         Upload Excel File
//       </button>
//     </div>
//   );
// }
//==============================================
// components/ImportExcel.jsx
// import React, { useRef } from "react";
// import { useExcelImport } from "../hooks/useExcelImport";

// export default function ImportExcel({
//   addTranslation,
//   categories,
//   addCategory,
// }) {
//   const fileInputRef = useRef(null);
//   const { parseExcelFile } = useExcelImport();

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     parseExcelFile(file, (rows) => {
//       const newCategories = [...categories];
//       console.log(rows);

//       rows.forEach((row) => {
//         // console.log(row);

//         const expression = row.English?.trim();
//         const word = row.Key?.trim();
//         const categoryName = row.Category?.trim();

//         if (!expression || !word || !categoryName) return;

//         // find or create category
//         let categoryObj = newCategories.find((c) => c.name === categoryName);
//         if (!categoryObj) {
//           categoryObj = {
//             id: crypto.randomUUID(),
//             name: categoryName,
//           };
//           newCategories.push(categoryObj);
//         }

//         addTranslation({
//           id: crypto.randomUUID(),
//           expression,
//           word,
//           categoryId: categoryObj.id,
//           startDate: new Date().toISOString(),
//         });
//       });
//       // console.log(newCategories);

//       addCategory(newCategories);
//       e.target.value = "";
//     });
//   };

//   return (
//     <div className="card">
//       <h2>Import Excel</h2>

//       <input
//         type="file"
//         accept=".xlsx, .xls"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFileUpload}
//       />

//       <button
//         className="btn primary"
//         onClick={() => fileInputRef.current.click()}
//       >
//         Upload Excel File
//       </button>
//     </div>
//   );
// }
//=====================---------------------

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
      const categoryCache = {}; // name -> categoryObj

      rows.forEach((row) => {
        const expression = row.English?.trim();
        const word = row.Key?.trim();
        const categoryName = row.Category?.trim();
        if (!expression || !word || !categoryName) return;

        // check cache first
        let categoryObj =
          categoryCache[categoryName] ||
          categories.find(
            (c) => c.name.toLowerCase() === categoryName.toLowerCase()
          );

        if (!categoryObj) {
          categoryObj = addCategory(categoryName); // creates new category
        }

        // cache it for subsequent rows
        if (categoryObj) {
          categoryCache[categoryName] = categoryObj;
        }

        // prevent duplicate translations
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
