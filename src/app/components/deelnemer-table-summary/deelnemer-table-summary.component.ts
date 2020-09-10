import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-deelnemer-table-summary',
  templateUrl: './deelnemer-table-summary.component.html',
  styleUrls: ['./deelnemer-table-summary.component.scss'],
})
export class DeelnemerTableSummaryComponent implements OnInit {

  @Input() line: any;
  @Input() showDetail: any;
  @Input() mainValue: string;

  constructor() { }

  ngOnInit() {}

}
