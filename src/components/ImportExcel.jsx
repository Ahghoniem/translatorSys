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


import React from "react";
import * as XLSX from "xlsx";

export default function ImportExcel({
  addTranslation,
  categories,
  setCategories,
}) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet);

      const newCategories = [...categories];

      rows.forEach((row) => {
        const Expression = row.Expression?.trim();
        const Word = row.Word?.trim();
        const Category = row.Category?.trim();

        if (!Expression || !Word || !Category) return;

        // Find or create category
        let categoryObj = newCategories.find((c) => c.name === Category);
        if (!categoryObj) {
          categoryObj = {
            id: crypto.randomUUID(),
            name: Category,
          };
          newCategories.push(categoryObj);
        }

        // Add translation
        addTranslation({
          id: crypto.randomUUID(),
          expression: Expression,
          word: Word,
          categoryId: categoryObj.id,
          startDate: new Date().toISOString(),
        });
      });

      setCategories(newCategories);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="card">
      <h2>Import Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  );
}

