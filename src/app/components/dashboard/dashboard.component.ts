import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { CategoryResponseModel } from '../../core/models/CategoryResponse';
import { EditiosResponseModel } from '../../core/models/EditionsResponse';
import { PlayerResponseModel } from '../../core/models/PlayerResponse';
import { ToastrService } from 'ngx-toastr';
import { TeamResponseModel } from '../../core/models/TeamResponse';
import { GroupsResponseModel } from '../../core/models/GroupsResponse';
import { AlterTeamGroupRequest } from '../../core/models/AlterTeamGroupRequest';
import { GamesResponse } from '../../core/models/GamesResponse';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly _dashboard = inject(DashboardService);
  private readonly _toastr = inject(ToastrService);

  public selectedTeamCategory: string = '';
  public selectedTeamEdition: string = '';
  public selectedGroupTeamFilter: string = '';
  public categories: CategoryResponseModel[] = [];
  public editions: EditiosResponseModel[] = [];
  public players: PlayerResponseModel[] = [];
  public teams: TeamResponseModel[] = [];
  public groups: GroupsResponseModel[] = [];
  public games: GamesResponse[] = [];

  public newTeamFormGroup = new FormGroup({
    name: new FormControl('', {validators: Validators.required}),
    pay: new FormControl(false, {validators: Validators.required}),
    categoryName: new FormControl('', {validators: Validators.required}),
    editionName:new FormControl('', {validators: Validators.required})
  });

  public newGroupFormGroup = new FormGroup({
    name: new FormControl('', {validators: Validators.required})
  });

  public newGameFormGroup = new FormGroup({
    team1Name: new FormControl('', {validators: Validators.required}),
    team2Name: new FormControl('', {validators: Validators.required}),
    court: new FormControl(1, {validators: Validators.required}),
    schedule: new FormControl('', {validators: Validators.required})
  })

  constructor(){}

  ngOnInit(){
    this.getCategories();
    this.getEditions();
    this.getPlayers();
    this.getTeams();
    this.getGroups();
    this.getGames();
  };

  private getCategories(){
    this._dashboard.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  private getEditions(){
    this._dashboard.getAllEditions().subscribe(
      (data: any) => {
        this.editions = data;
      },
      (error: any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    );
  }

  private getPlayers(){
    this._dashboard.getAllPlayers().subscribe(
      (data:any) => {
        this.players = data;
      },
      (error: any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    );
  }

  private getTeams(){
    this._dashboard.getAllTeams().subscribe(
      (data:any) => {
        this.teams = data;
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    );
  }

  private getGroups() {
    this._dashboard.getAllGroups().subscribe(
      (data:any) => {
        this.groups = data;
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    );
  }

  private getGames() {
    this._dashboard.getAllGames().subscribe(
      (data:any) => {
        this.games = data;
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    );
  }

  public sendNewGroup() {
    this._dashboard.newGroup(this.newGroupFormGroup.value).subscribe(
      (data:any) => {
        this.getGroups();
        this._toastr.success(`Grupo "${data.name}" se ha creado con éxito`, 'Bien!')
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    )
  }

  public sendNewGame(){
    this.newGameFormGroup.value.schedule = "2024-07-27T" + this.newGameFormGroup.value.schedule + ":00.000Z";
    this._dashboard.newGame(this.newGameFormGroup.value).subscribe(
      (data:any) => {
        this._toastr.success('Partido añadido con éxito', 'Bien!')
      },
      (error: any) => {
        this._toastr.error(error, 'Algo no ha ido cocrrectamente')
      }
    )
  }

  public alterEdition(editionName: string){
    this._dashboard.alterEdition(editionName).subscribe(
      (data:any) => {
        this.getEditions();
      },
      (error: any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    );
  }

  public searchPlayerCategory(){
    this._dashboard.getPlayerCategory(this.selectedTeamCategory).subscribe(
      (data:any) => {
        this.players = data;
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    );
  }

  public searchPlayerEdition(){
    this._dashboard.getPlayerEdition(this.selectedTeamEdition).subscribe(
      (data:any) => {
        this.players = data;
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  public searchPlayerTeam(){
    this._dashboard.getPlayerEdition(this.selectedTeamEdition).subscribe(
      (data:any) => {
        this.players = data;
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    );
  }

  public searchTeamGroup(){
    this._dashboard.getTeamGroup(this.selectedGroupTeamFilter).subscribe(
      (data:any) => {
        this.teams = data;
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    )
  }

  public sendNewTeam(){
    this._dashboard.newTeam(this.newTeamFormGroup.value).subscribe(
      (data:any) => {
        this.getTeams();
        this._toastr.success(`Equipo ${data.name} se ha guardado con éxito`, 'Bien!')
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    )
  }

  public alterTeamGroup(teamName: string, editionName:string, event:Event) {
    const target = event.target as HTMLSelectElement;
    var alterTeamData = {
      "teamName": teamName,
      "editionName": editionName,
      "groupName": target?.value
    }

    console.log(alterTeamData);

    this._dashboard.alterTeamGroup(alterTeamData).subscribe(
      (data:any) => {
        this.getTeams();
        this._toastr.success(`Equipo "${alterTeamData?.teamName}" se ha añadido al grupo "${alterTeamData?.groupName}"`, 'Bien!');
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    )
  }

  public removeTeam(teamName: string, editionName:string){
    this._dashboard.removeTeam(teamName, editionName).subscribe(
      (data:any) => {
        this.getTeams();
        this._toastr.success(`Equipo "${data.name}" de la edición "${data.editionName}" se ha borrado con éxito`, 'Bien!')
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    )
  }

  public removeGroup(groupName: string){
    this._dashboard.removeGroup(groupName).subscribe(
      (data:any) => {
        this.getGroups();
        this._toastr.success(`Grupo "${groupName}" se ha borrado con éxito`, 'Bien!');
      },
      (error:any) => {
        this._toastr.error(error, 'Algo no ha ido correctamente.');
      }
    )
  }
}
