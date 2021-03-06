import { Injectable } from '@angular/core';
import { IRateApiData } from '../models/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RateApiService {
  constructor(
    private http: HttpClient
  ) { }

  public getRate(): Observable<IRateApiData> {
    return this.http.get<IRateApiData>('rateApi');
  }
}
