import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private table: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);

  constructor() { }

  addTableRow(data: string[]): void {
    const newData = this.table.getValue();
    newData.push(data);
    this.table.next(newData);
  }

  getTable(): Observable<string[][]> {
    return this.table.asObservable();
  }
}
