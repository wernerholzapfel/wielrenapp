import { Pipe, PipeTransform } from '@angular/core';
import {IRennerTableSummary} from '../../components/renner-table-summary/renner-table-summary.component';

@Pipe({
  name: 'filterIsOut'
})
export class FilterIsOutPipe implements PipeTransform {

  transform(value: IRennerTableSummary[]): IRennerTableSummary[] {
    if(!value)return null;

    return value.filter(r => r.rider.isOut)
        .sort((a, b) => {
              return b.latestEtappe?.etappeNumber - a.latestEtappe?.etappeNumber;
        });
  }

}
