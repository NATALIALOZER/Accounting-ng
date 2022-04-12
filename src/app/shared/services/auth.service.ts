import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfile } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public getUser(user: IProfile): Observable<IProfile[]> {
    return this.http.get<IProfile[]>(`users?email=${user.email}`);
  }

  public setUser(user: IProfile): Observable<IProfile> {
    return this.http.post<IProfile>('users', user);
  }

  public getUserData(): IProfile[] {
    const userData = localStorage.getItem('user') as string;
    return JSON.parse(userData);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  public signOut(): boolean {
    localStorage.removeItem('user');
    return this.isAuthenticated();
  }
}

