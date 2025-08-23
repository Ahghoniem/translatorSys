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

      rows.forEach((row) => {
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

