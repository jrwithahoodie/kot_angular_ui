import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { GroupClassificationResponse } from '../../core/models/GroupClassificationResponse'
import { CompetitionInfoService } from '../../services/competition-info.service';
import { GamesResponse } from '../../core/models/GamesResponse';

@Component({
  selector: 'app-competition-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competition-info.component.html',
  styleUrl: './competition-info.component.css'
})
export class CompetitionInfoComponent implements OnInit{
  private readonly _competition = inject(CompetitionInfoService);
  private readonly _toastr = inject(ToastrService);

  public groupsClassification: GroupClassificationResponse[] = [];
  public court1GamesList: GamesResponse[] = [];
  public court2GamesList: GamesResponse[] = [];
  public court3GamesList: GamesResponse[] = [];
  public court4GamesList: GamesResponse[] = [];
  
  ngOnInit() {
    this.getGroupsClassification();
    for(let i = 1; i <= 4; i++){
      this.getCourtsGames(i);
    }
  }

  private getGroupsClassification(){
    this._competition.getAllGroupsClassification().subscribe(
      (data:any) => {
        this.groupsClassification = data;
        this._toastr.success('Se han traído los datos de clasificaciones correctamente', 'Bien!');
      },
      (error: any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    )
  }

  private getCourtsGames(court: number){
    this._competition.getAllGamesByCourt(court).subscribe(
      (data:any) => {
        switch (court){
          case 1:
            this.court1GamesList = data
            console.log(this.court1GamesList)
            break;
          case 2:
            this.court2GamesList = data
            console.log(this.court2GamesList)
            break;
          case 3:
            this.court3GamesList = data
            console.log(this.court3GamesList)
            break;
          case 4:
            this.court4GamesList = data
            console.log(this.court4GamesList)
            break;
        }
        this._toastr.success('Se han traído los datos de partidos correctamente', 'Bien!');
      },
      (error: any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    )
  }
}
