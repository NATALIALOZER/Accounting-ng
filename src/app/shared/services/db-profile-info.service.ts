import { Inject, Injectable } from '@angular/core';
import { Bill } from '../models/interfaces';
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
}

