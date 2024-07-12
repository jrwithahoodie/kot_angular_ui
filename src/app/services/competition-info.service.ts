import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionInfoService {
  private readonly _http = inject(HttpClient);

  constructor() { }

  getAllGroupsClassification(): Observable<any>{
    return this._http.get('http://localhost:44373/api/Teams/classifications/27072024');
  }

  getAllGamesByCourt(courtNumber: number): Observable<any>{
    return this._http.get(`http://localhost:44373/api/Games/court/${courtNumber}`);
  }
}
