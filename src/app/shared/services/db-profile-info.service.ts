import { Inject, Injectable } from '@angular/core';
import { IBill, ICategory, IEventInfo } from '../models/interfaces';
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

  public getUserBalance(): Observable<IBill> {
    return this.http.get<IBill>(this.baseUrl + `bill`);
  }

  public getUserEvents(): Observable<IEventInfo[]> {
    return this.http.get<IEventInfo[]>(this.baseUrl + `events`);
  }

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.baseUrl + `categories`);
  }

}

