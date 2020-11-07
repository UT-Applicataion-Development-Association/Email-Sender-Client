import XLSX from "xlsx";

export default class ExcelService {
    constructor() {
        this.workbook = null;
    }

    async loadFromBlob(blob) {
        const buffer = await blob.arrayBuffer();
        const data = new Uint8Array(buffer);
        this.workbook = XLSX.read(new Uint8Array(data), { type: "array" });
    }

    convertSheetToArray(sheetIndex = 0) {
        if (!this.workbook) {
            /** Error */
            return;
        }
        const sheet = this.workbook.Sheets[this.workbook.SheetNames[sheetIndex]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        return data;
    }

    convertArrayToSheet(array) {
        return XLSX.utils.aoa_to_sheet(array);
    }

    createWorkbook() {
        this.workbook = XLSX.utils.book_new();
    }

    addSheetFromArray(array, sheetname) {
        const sheet = this.convertArrayToSheet(array);
        XLSX.utils.book_append_sheet(this.workbook, sheet, sheetname);
    }

    downloadWorkbook(fileName) {
        XLSX.writeFile(this.workbook, fileName);
    }
}
