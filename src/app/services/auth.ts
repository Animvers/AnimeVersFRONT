import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { App } from '../app';
import { ApiReponse } from '../models/api-reponse';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUserSelect = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  updateUser(user: User) {
    this.currentUserSelect.set(user);
  }

  login(bodyNoJson: any, apiUrl: string): Observable<ApiReponse> {
    const body = JSON.stringify(bodyNoJson);
    return this.http.post<ApiReponse>(apiUrl + '/auth/login', body, this.options);
  }

  register(bodyNoJson: any, apiUrl: string): Observable<ApiReponse> {
    const body = JSON.stringify(bodyNoJson);
    return this.http.post<ApiReponse>(apiUrl + '/auth/register', body, this.options);
  }

  token(apiUrl: string, options: { headers: HttpHeaders }): Observable<ApiReponse> {
    return this.http.get<ApiReponse>(apiUrl + '/user/token', options);
  }
}
