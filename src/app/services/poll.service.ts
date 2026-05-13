import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiReponse } from '../interfaces/api-reponse';

@Injectable({ providedIn: 'root' })
export class PollService {
  constructor(private http: HttpClient) {}

  createPoll(formData: FormData, apiUrl: string, token: string): Observable<ApiReponse> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token, });
    return this.http.post<ApiReponse>(`${apiUrl}/sondage/create`, formData, { headers });
  }

  getPolls(apiUrl: string): Observable<ApiReponse> {
    return this.http.get<ApiReponse>(`${apiUrl}/sondage/all`);
  }
}
