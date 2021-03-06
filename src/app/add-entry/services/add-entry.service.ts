import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAttributes } from 'src/app/models/attributes';
import { ITable } from 'src/app/models/table';

@Injectable({
  providedIn: 'root'
})
export class AddEntryService {

  headers = new HttpHeaders({
    'Content-Type':  'application/vnd.api+json',
    'X-Auth-Token': "9b533caf-85e2-4e38-bba2-b382d6fa9343",
    'X-Organization-Id': "20550"
  })

  constructor(
    private http: HttpClient
  ) { }

  addEntry(entry: IAttributes): Observable<ITable>{
    //not finished
    const data = {data: {attributes: entry}}
    return this.http.post<ITable>('https://api.productive.io/api/v2/time_entries', data, {headers: this.headers})
  }
}
