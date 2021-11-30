import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';
import { Category, EventInfo } from '../../shared/models/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  @ViewChild('paginator') public paginator!: MatPaginator;
  public dataSource!: MatTableDataSource<EventInfo>;
  public data: EventInfo[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  private categoryName!: { [p: string]: string; [p: number]: string };


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
        (response: EventInfo[]) => {
          response.forEach( item => {
            item.category = this.categoryName[item.category];
          });
          this.data = response;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          });
  }


  private getCategories(): void {
    this.profileInfoService.getCategories().subscribe(
      (response: Category[]) => {
        this.categoryName = response.reduce(
          (results, current) => ({
            ...results,
            [current.id]: current.name
          }),
          {}
        );
      });
  }
}
