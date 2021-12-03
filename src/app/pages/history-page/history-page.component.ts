import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';
import { ICategory, IEventInfo } from '../../shared/models/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  @ViewChild('paginator') public paginator!: MatPaginator;
  public dataSource!: MatTableDataSource<IEventInfo>;
  public data: IEventInfo[] = [];
  public categoriesArray: ICategory[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private profileInfoService: DbProfileInfoService
  ) { }

  public ngOnInit(): void {
    this.getCategories();
    this.getEvents();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getEvents(): void {
    this.profileInfoService.getUserEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: IEventInfo[]) => {
          this.data = response;
          this.dataSource = new MatTableDataSource<IEventInfo>(this.data);
          this.dataSource.paginator = this.paginator;
        });
  }
  
  private getCategories(): void {
    this.profileInfoService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ICategory[]) => this.categoriesArray = response);
  }
}
