import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';
import { Category, EventInfo } from '../../shared/models/interfaces';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  public dataSource!: EventInfo[];
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
          this.dataSource = response;
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
