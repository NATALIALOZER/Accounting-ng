import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Profile} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JsonDBService {
  public urlApi = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  public getUser(user: Profile): Observable<any> {
    return this.http.get<Profile[]>(`${this.urlApi}users?email=${user.email}`)
      .pipe(
        catchError(err => {
        console.log('Обработка неверного адреса почты');
        return throwError(err);
      })
    );
  }
}
