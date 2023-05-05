import { Pipe, PipeTransform } from '@angular/core';
import { ITeamScore } from 'src/app/models/teamscore.model';
import {IRennerTableSummary} from '../../components/renner-table-summary/renner-table-summary.component';

@Pipe({
  name: 'filterIsOut'
})
export class FilterIsOutPipe implements PipeTransform {

  transform(value: ITeamScore[]): ITeamScore[] {
    if(!value)return null;

    return value.filter(r => r.tourrider_isOut)
        .sort((a, b) => {
              return b.latestEtappeNumber - a.latestEtappeNumber;
        });
  }

}
