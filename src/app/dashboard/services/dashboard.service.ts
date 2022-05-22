import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITable } from 'src/app/models/table';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getTimeEntries(): Observable<ITable>{
    const header = new HttpHeaders({
      'Content-Type':  'application/vnd.api+json',
      'X-Auth-Token': "9b533caf-85e2-4e38-bba2-b382d6fa9343",
      'X-Organization-Id': '20550'
    })
    return this.http.get<ITable>('https://api.productive.io/api/v2/time_entries', {headers: header})
  }
}
