import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:1337'; // URL вашего Strapi backend
  public currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  public login(identifier: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/auth/local`, {
        identifier,
        password,
      })
      .pipe(
        map((response) => {
          localStorage.setItem('jwt', response['jwt']);
          localStorage.setItem('user', JSON.stringify(response['user']));
          this.currentUser.next(response['user'])
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
        localStorage.setItem('user', JSON.stringify(response['user']));
        this.currentUser.next(response['user']);
        return response['user'];
      })
    );
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('jwt');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}/api/users/me`, { headers }).pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.next(user);
          return user;
        })
      );
    } else {
      throw new Error('No token found');
    }
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.currentUser.next(null)
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

  public getCurrentUserFromLocal(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
