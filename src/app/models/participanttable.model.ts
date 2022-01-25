import {IPrediction} from './participant.model';

export interface IParticipanttable {
    id: string;
    displayName: string;
    teamName: string;
    predictions: Prediction[];
    totalStagePoints: number;
    previousPosition: number;
    previousTotalPoints: number;
    totalMountainPoints: number;
    totalPoints: number;
    totalPointsPoints: number;
    totalTourPoints: number;
    totalYouthPoints: number;
    position: number;
}

export interface Rider2 {
    id: string;
    firstName: string;
    firstNameShort: string;
    initials: string;
    surName: string;
    nationality: string;
    surNameShort: string;
    dateOfBirth: string;
    isActive: boolean;
}

export interface Team {
    id: string;
    teamName: string;
    teamNameShort: string;
    country: string;
    teamAbbreviation: string;
}

export interface LatestEtappe {
    id: string;
    etappeNumber: number;
    etappeName: string;
    date: string;
    type?: any;
    isDriven: boolean;
}

export interface Tour {
    id: string;
    tourName: string;
    startDate: string;
    endDate: string;
    deadline: Date;
    isActive: boolean;
    hasEnded: boolean;
    scoreTable: number;
}

export interface Etappe {
    id: string;
    etappeNumber: number;
    etappeName: string;
    date: string;
    type?: any;
    isDriven: boolean;
    tour: Tour;
}

export interface Stageclassification {
    id: string;
    position?: number;
    etappe: Etappe;
    stagePoints: number;
    calculation: string;
}

export interface Rider {
    id: string;
    waarde: number;
    isOut: boolean;
    rider: Rider2;
    team: Team;
    latestEtappe: LatestEtappe;
    stageclassifications: Stageclassification[];
}

export interface Prediction {
    id: string;
    isRider: boolean;
    isWaterdrager: boolean;
    isMeesterknecht: boolean;
    isLinkebal: boolean;
    isBeschermdeRenner: boolean;
    isComplete: boolean;
    rider: Rider;
    totalStagePoints: number;
    deltaStagePoints: number;
    mountainPoints?: number;
    pointsPoints?: number;
    youthPoints?: number;
}

