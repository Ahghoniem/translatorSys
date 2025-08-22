// hooks/useExcelImport.js
// import * as XLSX from "xlsx";

// export const useExcelImport = () => {
//   const parseExcelFile = (file, callback) => {
//     const reader = new FileReader();

//     reader.onload = (evt) => {
//       const data = new Uint8Array(evt.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const rows = XLSX.utils.sheet_to_json(worksheet);

//       callback(rows);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   return { parseExcelFile };
// };



import * as XLSX from "xlsx";
import { useTranslations } from "./useTranslations";

export const useExcelImport = () => {
  const { addTranslation } = useTranslations();

  const parseExcelFile = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet);

      // Save each row to localStorage
      rows.forEach((row) => {
        // row should have expression, word, categoryId
        if (row.expression && row.word && row.categoryId) {
          addTranslation({
            expression: row.expression,
            word: row.word,
            categoryId: row.categoryId,
          });
        }
      });

      if (callback) callback(rows);
    };

    reader.readAsArrayBuffer(file);
  };

  return { parseExcelFile };
};

