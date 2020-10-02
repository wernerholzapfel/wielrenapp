import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-renner-table-summary',
  templateUrl: './renner-table-summary.component.html',
  styleUrls: ['./renner-table-summary.component.scss'],
})
export class RennerTableSummaryComponent implements OnInit {

  @Input() line: any;
  @Input() showDetail: any;
  @Input() mainValue: string;

  constructor() { }

  ngOnInit() {}

}
