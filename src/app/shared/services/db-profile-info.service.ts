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

  public createEvent(data: IEventInfo): Observable<IEventInfo> {
    return this.http.post<IEventInfo>('events', data);
  }

  public createCategory(data: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>('categories', data);
  }

  public updateCategory(data: ICategory ): Observable<ICategory> {
    return this.http.patch<ICategory>(`categories/${data.id}`, data);
  }

  public removeCategory(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`categories/${id}`);
  }
}

