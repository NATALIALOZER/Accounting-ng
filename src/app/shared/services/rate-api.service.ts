import { Injectable } from '@angular/core';
import { rateApiData } from '../models/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateApiService {
  private urlApi = environment.urlRateApi;

  constructor(
    private http: HttpClient
  ) { }

  public getRate(): Observable<rateApiData> {
    return this.http.get<rateApiData>(this.urlApi);
  }
}
