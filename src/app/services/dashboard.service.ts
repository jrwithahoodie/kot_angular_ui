import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly _http = inject(HttpClient);

  constructor() { }

  getAllTeams():Observable<any>{
    return this._http.get('http://localhost:44373/api/Teams');
  }
}
