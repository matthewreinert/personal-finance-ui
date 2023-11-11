import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = '/api/auth';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.authUrl + '/login',
      {
        username,
        password,
      },
      this.httpOptions
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(
      this.authUrl + '/register',
      {
        username,
        password,
      },
      this.httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.authUrl + '/logout', {}, this.httpOptions);
  }
}
