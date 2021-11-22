import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JsonDBService {
  public urlApi = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  public getUser(user: Profile): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.urlApi}users?email=${user.email}`);
  }

  public setUser(user: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.urlApi}users`, user);
  }
}
