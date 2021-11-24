import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string
  ) { }

  public getUser(user: Profile): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.baseUrl + `users?email=${user.email}`);
  }

  public setUser(user: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.baseUrl + 'users', user);
  }

  public getUserData(): Profile[] {
    const userData = localStorage.getItem('user') as string;
    return JSON.parse(userData);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }


  public signOut(): void {
    localStorage.removeItem('user');
  }
}
