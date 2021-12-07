import { Inject, Injectable } from '@angular/core';
import { IBill, ICategory, IEventInfo } from '../models/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbProfileInfoService {

  constructor(
    private http: HttpClient,
  ) { }

  public getUserBalance(): Observable<IBill> {
    return this.http.get<IBill>(  `bill`);
  }

  public getUserEvents(): Observable<IEventInfo[]> {
    return this.http.get<IEventInfo[]>(`events`);
  }

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`categories`);
  }

  public getEventById(id: number): Observable<IEventInfo> {
    return this.http.get<IEventInfo>(`events/${id}`);
  }
}

