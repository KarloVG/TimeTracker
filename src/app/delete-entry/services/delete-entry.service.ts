import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteEntryService {

  headers = new HttpHeaders({
    'Content-Type':  'application/vnd.api+json',
    'X-Auth-Token': "9b533caf-85e2-4e38-bba2-b382d6fa9343",
    'X-Organization-Id': "20550"
  })

  constructor(
    private http: HttpClient
  ) { }

  deleteEntry(id: string): Observable<any>{
    return this.http.delete<any>(`https://api.productive.io/api/v2/time_entries/${id}`, {headers: this.headers})
  }
}
