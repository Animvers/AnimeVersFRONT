import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiReponse } from '../models/api-reponse';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  update(bodyNoJson: any, apiUrl: string, options: { headers: HttpHeaders },): Observable<ApiReponse> {
    const body = JSON.stringify(bodyNoJson);
    return this.http.put<ApiReponse>(apiUrl + '/profil/user/update', body, options);
  }

  getProfil(apiUrl: string, options: { headers: HttpHeaders }): Observable<ApiReponse> {
    return this.http.get<ApiReponse>(apiUrl + '/profil/user', options);
  }
}
