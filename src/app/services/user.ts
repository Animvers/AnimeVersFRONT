import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiReponse } from '../models/api-reponse';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  update(formData: FormData, apiUrl: string, token: string): Observable<ApiReponse> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token, });
    return this.http.post<ApiReponse>(apiUrl + '/profil/user/update', formData, { headers });
  }

  getProfil(apiUrl: string, options: { headers: HttpHeaders }): Observable<ApiReponse> {
    return this.http.get<ApiReponse>(apiUrl + '/profil/user', options);
  }
}
