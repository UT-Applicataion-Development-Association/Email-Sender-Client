import XLSX from "xlsx";
import { TypeError } from "Configs/error";

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
            throw new TypeError("Invalid workbook");
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

    addSheetFromArray(arr, sheetname) {
        if (!(arr instanceof Array)) {
            throw new TypeError("Invalid type of variable: arr");
        }

        const sheet = this.convertArrayToSheet(arr);
        XLSX.utils.book_append_sheet(this.workbook, sheet, sheetname);
    }

    downloadWorkbook(fileName) {
        XLSX.writeFile(this.workbook, fileName);
    }
}
