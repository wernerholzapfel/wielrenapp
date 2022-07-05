import { Pipe, PipeTransform } from '@angular/core';
import {IRennerTableSummary} from '../../components/renner-table-summary/renner-table-summary.component';

@Pipe({
  name: 'searchRiders'
})
export class SearchRidersPipe implements PipeTransform {

  transform(riders: IRennerTableSummary[], searchTerm: string): unknown {
      if ((searchTerm === undefined || searchTerm.length < 2)) {
        return riders;
      } else {
        searchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return riders.filter(rider => {
              const searchableWords: string[] = (`${rider.rider.firstName} ${rider?.rider.surName}`)
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .split(' ');

              return (!searchTerm || searchTerm
                  .trim()
                  .split(' ')
                  .map(word => word)
                  .filter(searchWord => {
                    return searchableWords.filter(searchableWord => {
                      return searchableWord.indexOf(searchWord.trim()) > -1;
                    }).length > 0;
                  }).length > 0);
            });
      }
    }
}
