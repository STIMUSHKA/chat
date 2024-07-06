import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:1337'; // URL вашего Strapi backend

  constructor(private http: HttpClient) {}

  public login(identifier: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/local`, {
        identifier,
        password,
      })
      .pipe(
        map((response) => {
          localStorage.setItem('jwt', response['jwt']);
          localStorage.setItem('user', response['user']);
          return response['user'];
        })
      );
  }

  public register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/local/register`, {
      username: username,
      email: email,
      password: password,
    }).pipe(
      map((response) => {
        localStorage.setItem('jwt', response['jwt']);
        localStorage.setItem('user', response['user']);
        return response['user'];
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('jwt');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }
}
