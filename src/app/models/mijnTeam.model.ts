export interface Participant {
    displayName: string;
    id: string;
    teamName: string;
}

export interface Prediction {
    id: string;
    isBeschermdeRenner: boolean;
    isComplete: boolean;
    isLinkebal: boolean;
    isMeesterknecht: boolean;
    isRider: boolean;
    isWaterdrager: boolean;
    participant: Participant;
}

export interface Rider {
    dateOfBirth: string;
    firstName: string;
    firstNameShort: string;
    id: string;
    initials: string;
    isActive: boolean;
    nationality: string;
    surName: string;
    surNameShort: string;
}

export interface Etappe {
    date: string;
    etappeName: string;
    etappeNumber: number;
    id: string;
    isDriven: boolean;
}

export interface Stageclassification {
    etappe: Etappe;
    id: string;
    position: number;
    stagePoints: number;
}

export interface Team {
    country: string;
    id: string;
    teamAbbreviation: string;
    teamName: string;
    teamNameShort: string;
}

export interface Tourclassification {
    id: string;
    position: number;
}

export interface IMijnTeam {
    id: string;
    isOut: boolean;
    predictions: Prediction[];
    rider: Rider;
    stageclassifications: Stageclassification[];
    team: Team;
    tourclassifications: Tourclassification[];
    waarde: number;
}

