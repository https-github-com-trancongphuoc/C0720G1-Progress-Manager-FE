import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    return (XLSX.utils.sheet_to_json(ws, {header: 2})) as XLSX.AOA2SheetOpts;
  }

  public exportToFile(fileName: string, element_id: string) {
    if (!element_id) { throw new Error('Element Id does not exists'); }

    const tbl = document.getElementById(element_id);
    const wb = XLSX.utils.table_to_book(tbl);
    XLSX.writeFile(wb, fileName + '.xlsx');
  }
}
