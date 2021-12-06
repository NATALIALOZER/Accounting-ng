import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ICategory, IEventInfo } from '../../../shared/models/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() public dataSource!: MatTableDataSource<IEventInfo>;
  @Input() public categoriesArray: ICategory[] = [];
  @ViewChild(MatSort, {static: true}) public sort!: MatSort;
  public displayedColumns: string[] = ['id', 'amount', 'date', 'category', 'type', 'action'];
  public search: string = '';


  public ngOnInit(): void {
    this.dataSource.data.forEach( i => i.category = this.getName(i.category + ''));
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  public applyFilter(): void {
    this.dataSource.filterPredicate = (data: {category: string | number}, filterValue: string) => {
      const dataStr = data.category + '';
      return dataStr.trim().toLowerCase().indexOf(filterValue) !== -1;
    };
    this.dataSource.filter = this.search.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getName(category: string): string {
    const item = this.categoriesArray.find( i => i.id === +category);
    return item ? item.name : 'noname';
  }

  public getColor(type: string): string {
    return type === 'income' ? 'Доход' : 'Расход';
  }
}
