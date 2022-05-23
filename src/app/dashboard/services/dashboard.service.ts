import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITable } from 'src/app/models/table';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  headers = new HttpHeaders({
    'Content-Type':  'application/vnd.api+json',
    'X-Auth-Token': "9b533caf-85e2-4e38-bba2-b382d6fa9343",
    'X-Organization-Id': "20550"
  })

  constructor(private http: HttpClient) { }

  getTimeEntries(): Observable<ITable>{
    return this.http.get<ITable>('https://api.productive.io/api/v2/time_entries', {headers: this.headers})
  }

  getServicesId(id: string): Observable<any>{
    return this.http.get<any>(`https://api.productive.io/api/v2/services${id}`, {headers: this.headers})
  }

  getName(res: any): Observable<any>{
    return this.http.get<any>(`https://api.productive.io/api/v2/people/${res}`, {headers: this.headers})
  }

  getServices(): Observable<ITable>{
    return this.http.get<ITable>(`https://api.productive.io/api/v2/services`, {headers: this.headers})
  }
}
