import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  @Input() dataSource: any[];
  @Input() columns: any[];
  sortColumn: string;
  sortOrder = 1;

  constructor() {}

  ngOnInit() {}

  onEmployeeSearch(gridData: any) {
    this.dataSource = gridData;
  }

  setSortColumn(column: string) {
    this.sortColumn = column;
    this.sortOrder = this.sortOrder * -1;
    this.applySorting();
  }

  applySorting() {
    this.dataSource.sort((a: any, b: any) => {
      let first = a[this.sortColumn].toUpperCase();
      let second = b[this.sortColumn].toUpperCase();
      
      if(this.sortColumn == 'joining_date'){
        let dateParts = a[this.sortColumn].split("/");
        first = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        dateParts = b[this.sortColumn].split("/");
        second = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        return this.sortOrder == 1 ? second - first : first - second; 
      }

      return first == second ? 0 : first > second ? -this.sortOrder: this.sortOrder;
    });
  }
}
