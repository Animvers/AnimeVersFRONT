import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { asapScheduler, Observable } from 'rxjs';
import { ApiReponse } from '../interfaces/api-reponse';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUserSelect = signal<UserInterface | null>(null);

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  updateUser(user: UserInterface) {
    asapScheduler.schedule(() => {
    this.currentUserSelect.set(user);
    });
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
    return this.http.get<ApiReponse>(apiUrl + '/auth/token', options);
  }
}
