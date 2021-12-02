import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { EventInfo } from '../../shared/models/interfaces';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit, OnDestroy {
  public events$!: Observable<EventInfo[]>;
  private destroy$: Subject<void> = new Subject<void>();
  private selectedId!: number;


  constructor(
    private route: ActivatedRoute,
    private profileInfoService: DbProfileInfoService
  ) { }

  public ngOnInit(): void {
    this.getEvents();
    this.events$.subscribe(res => console.log(res));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getEvents(): void {
    this.events$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.profileInfoService.getEventById(this.selectedId);
      })
    );
    /*this.profileInfoService.getUserEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: EventInfo[]) => {
          this.events =  response;
        }
      );*/
  }
}
