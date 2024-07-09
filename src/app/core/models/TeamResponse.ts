import { PlayerResponseModel } from "./PlayerResponse";

export interface TeamResponseModel {
    id: number,
    name: string,
    pay: boolean,
    wins: number,
    defeats: number,
    classificationPoints: number,
    pointsDiff: number,
    editionName: string,
    categoryName: string,
    teamPlayers: PlayerResponseModel[]
}