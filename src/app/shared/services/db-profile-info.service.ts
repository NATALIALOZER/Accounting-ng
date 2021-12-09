import { Injectable } from '@angular/core';
import { IBill, ICategory, IEventInfo } from '../models/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  public postNewEvent(data: IEventInfo): Observable<object> {
    return this.http.post('events', data);
  }

  public postNewCategory(data: ICategory): Observable<object> {
    return this.http.post('categories', data);
  }

  public patchCategory(data: ICategory ): Observable<object> {
    return this.http.patch<ICategory>(`categories/${data.id}`, data);
  }

  public deleteCategory(id: number): Observable<object> {
    return this.http.delete<ICategory>(`categories/${id}`);
  }
}

