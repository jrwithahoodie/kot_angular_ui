import { PlayerResponseModel } from "./PlayerResponse";

export interface TeamResponseModel {
    id: number,
    name: string,
    pay: boolean,
    wins: number,
    defeats: number,
    classification_points: number,
    points_diff: number,
    editionName: string,
    categoryName: string,
    teamPlayers: PlayerResponseModel[]
}