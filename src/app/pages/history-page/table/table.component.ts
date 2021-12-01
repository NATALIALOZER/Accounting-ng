import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { EventInfo, RateTableData } from '../../../shared/models/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() public dataSource!: MatTableDataSource<EventInfo>;
  @ViewChild(MatSort, {static: true}) public sort!: MatSort;
  public displayedColumns: string[] = ['id', 'amount', 'date', 'category', 'type', 'action'];
  public search: string = '';

  public ngOnChanges(): void {
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
}
