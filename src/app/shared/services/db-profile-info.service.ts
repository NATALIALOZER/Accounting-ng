import { Inject, Injectable } from '@angular/core';
import { Bill, Category, EventInfo } from '../models/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbProfileInfoService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string
  ) { }

  public getUserBalance(): Observable<Bill> {
    return this.http.get<Bill>(this.baseUrl + `bill`);
  }

  public getUserEvents(): Observable<EventInfo[]> {
    return this.http.get<EventInfo[]>(this.baseUrl + `events`);
  }

  public getEventById(id: number): Observable<EventInfo[]> {
    return this.http.get<EventInfo[]>(this.baseUrl + `events/${id}`);
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + `categories`);
  }

}

