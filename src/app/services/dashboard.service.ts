import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AlterTeamGroupRequest } from '../core/models/AlterTeamGroupRequest';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly _http = inject(HttpClient);

  constructor() { }

  getAllTeams():Observable<any>{
    return this._http.get('http://localhost:44373/api/Teams');
  }

  getAllCategories():Observable<any>{
    return this._http.get('http://localhost:44373/api/Categories');
  }

  getAllEditions():Observable<any>{
    return this._http.get('http://localhost:44373/api/Editions');
  }

  getAllPlayers():Observable<any>{
    return this._http.get('http://localhost:44373/api/Players');
  }

  getAllGames(): Observable<any>{
    return this._http.get('http://localhost:44373/api/Games');
  }

  getAllGroups():Observable<any>{
    return this._http.get('http://localhost:44373/api/Groups');
  }

  getPlayerCategory(category:string):Observable<any>{
    return this._http.get(`http://localhost:44373/api/Players/category?category=${category}`);
  }
  
  getPlayerEdition(edition:string):Observable<any>{
    return this._http.get(`http://localhost:44373/api/Players/edition?edition=${edition}`);
  }

  alterEdition(editionName: string):Observable<any>{
    return this._http.post(`http://localhost:44373/api/Editions/${editionName}/alter`, '');
  }

  newTeam(teamData: any): Observable<any>{
    return this._http.post('http://localhost:44373/api/Teams/new', teamData);
  }

  alterTeamGroup(alterTeamData: AlterTeamGroupRequest): Observable<any>{
    return this._http.put('http://localhost:44373/api/Teams/altergroup', alterTeamData);
  }

  alterGameResult(alterGameData: any): Observable<any>{
    return this._http.put('http://localhost:44373/api/Games/result', alterGameData);
  }

  getTeamGroup(groupName: string): Observable<any>{
    return this._http.get(`http://localhost:44373/api/Teams/group/${groupName}`);
  }

  newGroup(groupData: any): Observable<any>{
    return this._http.post('http://localhost:44373/api/Groups', groupData);
  }

  newGame(gameData: any): Observable<any>{
    return this._http.post('http://localhost:44373/api/Games', gameData);
  }

  removeTeam(teamName: string, editionName: string): Observable<any>{
    return this._http.delete(`http://localhost:44373/api/Teams/${teamName}/${editionName}`);
  }

  removeGroup(groupName: string): Observable<any>{
    return this._http.delete(`http://localhost:44373/api/Groups/${groupName}`);
  }
}
