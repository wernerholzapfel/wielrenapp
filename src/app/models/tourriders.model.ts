import {ITeam} from './team.model';
import {IRider} from './rider.model';
import {ITour} from './tour.model';
import {IPrediction} from './participant.model';
import {LatestEtappe} from './participanttable.model';

export interface ITourriders {
  id: string;
  isOut: boolean;
  waarde: number;
  latestEtappe: LatestEtappe;
  rider: IRider;
  tour?: ITour;
  team?: ITeam;
  waterdragerTotalPoints?: number;
  waterdragerEtappePoints?: number;
  mountainPoints?: number;
  tourPoints?: number;
  pointsPoints?: number;
  youthPoints?: number;
  totalStagePoints?: number;
  predictions: IPrediction[];
}

