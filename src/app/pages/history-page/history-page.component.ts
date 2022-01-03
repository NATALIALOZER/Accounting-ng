import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, merge, Observable, Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';
import { ICategory, IEventInfo } from '../../shared/models/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalAddEventComponent } from '../record-page/modal-add-event/modal-add-event.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') public paginator!: MatPaginator;
  public dataSource!: MatTableDataSource<IEventInfo>;
  public data: IEventInfo[] = [];
  public categoriesArray: ICategory[] = [];
  public eventId: number = 0;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private profileInfoService: DbProfileInfoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.initSubscriptions();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openAddEventDialog(): void {
    const dialogRef = this.dialog.open<ModalAddEventComponent>(ModalAddEventComponent, {
      data: this.categoriesArray
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.initSubscriptions();
      }
    });
  }

  public back(): void {
    this.router.navigate([], { queryParams: {event: null}, queryParamsHandling: 'merge'});
    this.eventId = 0;
    this.initSubscriptions();
  }

  public initSubscriptions(): void {
    const params$ = this.getEventQueryParam();
    const events$ = this.getEvents();
    const categories$ = this.getCategories();

    merge(params$, categories$, events$)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe();
  }

  private getEventQueryParam(): Observable<void> {
    return this.activatedRoute.queryParams
      .pipe(map(params => {
          this.eventId = params['event'];
        }
      ));
  }

  private getEvents(): Observable<void> {
    return this.profileInfoService.getUserEvents()
      .pipe(map(
        (response: IEventInfo[]) => {
          this.data = response;
          this.dataSource = new MatTableDataSource<IEventInfo>(this.data);
          this.dataSource.paginator = this.paginator;
        }));
  }

  private getCategories(): Observable<void> {
    return this.profileInfoService.getCategories()
      .pipe(map((response: ICategory[]) => {
        this.categoriesArray = response;
      }));
  }
}
