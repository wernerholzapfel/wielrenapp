import {ITour} from './tour.model';
import {IRider} from './rider.model';
import {IPrediction} from './participant.model';

export interface IEtappe {
  id: string;
  etappeNumber: number;
  etappeName: string;
  date: Date;
  type?: string;
  tour: ITour;
  isDriven: boolean;
}

export interface IStageClassification {
  id?: string;
  position: number;
  punten: number;
  tour: ITour;
  etappe: IEtappe;
  tourrider: ITourrider;
  stagePoints?: number;
}

export interface ITourClassification {
  id?: string;
  position: number;
  tour: ITour;
  totalTourPoints: number;
  tourrider: ITourrider;
}

export interface ITourrider {
  id: string;
  waarde: number;
  rider: IRider;
  stageclassifications?: IStageClassification[];
  predictions?: IPrediction[];
}
