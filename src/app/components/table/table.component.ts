import {Component, OnInit} from '@angular/core';
import {DataStoreService} from "../../store/data-store.service";
import {XmlTransformerService} from "../../service/xml-transformer.service";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  table: string[][] = [];

  constructor(private dataStore: DataStoreService, private xmlTransformer: XmlTransformerService) {
  }

  ngOnInit(): void {
    this.dataStore.getTable().subscribe(data => {
      if (data.length > 0) {
        this.table = data;
      }
    });
  }

  onFileSelected(event: any): void {
    console.log('Файл выбран');
    const file: File = event.target.files[0];
    console.log('Выбранный файл:', file);
    if (file) {
      this.xmlTransformer.readExcel(file);
    }
  }

}
