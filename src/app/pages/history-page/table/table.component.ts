import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ICategory, IEventInfo, IRateTableData } from '../../../shared/models/interfaces';
import { MatPaginator } from '@angular/material/paginator';
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
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  public applyFilter(): void {
    this.dataSource.filter = this.search.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getName(category: number): string {
    let nameOfCategory = '';
    const item = this.categoriesArray.find( i => i.id === category);
    (item) ?  nameOfCategory = item.name :  nameOfCategory = 'noname';
    return nameOfCategory;
  }

  public getColor(type: string): string {
    return type === 'income' ? 'Доход' : 'Расход';
    /*let name = '';
    type === 'income' ? ({name = 'Доход'; }) : name = 'Расход';

    return name;*/
  }
}
