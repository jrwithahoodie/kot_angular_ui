import { Time } from "@angular/common";
import { TeamResponseModel } from "./TeamResponse";

export interface GamesResponse {
    id: number,
    team1: TeamResponseModel,
    team1Score: number,
    team2: TeamResponseModel,
    team2Score: number,
    court: number,
    schedule: string
}