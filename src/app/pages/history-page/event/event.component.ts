import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DbProfileInfoService } from '../../../shared/services/db-profile-info.service';
import { Subject, takeUntil } from 'rxjs';
import { ICategory, IEventInfo } from '../../../shared/models/interfaces';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  @Input() public id: number = 0;
  @Input() public categoriesArray: ICategory[] = [];
  public event!: IEventInfo;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private profileInfoService: DbProfileInfoService
  ) { }

  public ngOnInit(): void {
    this.getEvent(this.id);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getName(category: number | string): string {
    const item = this.categoriesArray.find( i => i.id === +category);
    return item ? item.name : 'noname';
  }

  public getEvent(id: number): void {
    this.profileInfoService.getEventById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe( response => {
        this.event = response;
      });
  }

}
