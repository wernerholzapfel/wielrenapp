export interface ITotaalStand {
    id: string;
    displayName: string;
    teamName: string;
    totaalpunten: number;
    etappepunten: number;
    algemeenpunten: number;
    bergpunten: number;
    puntenpunten: number;
    jongerenpunten: number;
    positie: number;
    deltapunten?: number;
    vorigePositie?: number;
}

export interface IEtappeStand {
    id: string;
    displayName: string;
    teamName: string;
    punten: number;
    positie: number;
}
