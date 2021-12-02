import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';
import { Observable, switchMap } from 'rxjs';
import { IEventInfo } from '../../shared/models/interfaces';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  public events$!: Observable<IEventInfo[]>;
  private selectedId!: number;


  constructor(
    private route: ActivatedRoute,
    private profileInfoService: DbProfileInfoService
  ) { }

  public ngOnInit(): void {
    this.getEvents();
    this.events$.subscribe(res => console.log(res));
  }


  private getEvents(): void {
    this.events$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.profileInfoService.getEventById(this.selectedId);
      })
    );
  }
}
