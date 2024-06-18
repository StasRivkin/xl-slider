import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {DataStoreService} from "../store/data-store.service";

@Injectable({
  providedIn: 'root'
})
export class XmlTransformerService {

  constructor(private dataStoreService: DataStoreService) {
  }

  readExcel(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true });

      // Удаляем пустые значения прямо внутри массива данных
      // @ts-ignore
      const filteredData = jsonData.map((row: {[key: string]: any}) => {
        const processedRow: any = {};
        Object.keys(row).forEach(key => {
          if (row[key] !== null && row[key] !== undefined && row[key] !== '') {
            processedRow[key] = row[key];
          }
        });
        return processedRow;
      }).filter(row => Object.keys(row).length > 0); // Убираем строки, в которых все значения были пустыми

      // Записываем данные в хранилище
      this.dataStoreService.addTableRow(filteredData);
    };
    reader.onerror = (error) => {
      console.error('File reading error:', error);
    };
    reader.readAsBinaryString(file);
  }

}
