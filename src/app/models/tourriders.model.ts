import {ITeam} from './team.model';
import {IRider} from './rider.model';
import {ITour} from './tour.model';

export interface ITourriders {
  id: string;
  waarde: number;
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
}

