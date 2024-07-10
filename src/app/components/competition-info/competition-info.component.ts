import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { GroupClassificationResponse } from '../../core/models/GroupClassificationResponse'
import { CompetitionInfoService } from '../../services/competition-info.service';

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

  ngOnInit() {
    this.getGroupsClassification();
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
}
