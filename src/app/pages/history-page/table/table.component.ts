import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { EventInfo, RateTableData } from '../../../shared/models/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() public dataSource!: MatTableDataSource<EventInfo>;
  public displayedColumns: string[] = ['id', 'amount', 'date', 'category', 'type', 'action'];
  public search: string = '';

  public applyFilter(): void {
    this.dataSource.filter = this.search.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
