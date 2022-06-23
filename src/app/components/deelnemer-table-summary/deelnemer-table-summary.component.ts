import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-deelnemer-table-summary',
    templateUrl: './deelnemer-table-summary.component.html',
    styleUrls: ['./deelnemer-table-summary.component.scss'],
})
export class DeelnemerTableSummaryComponent implements OnInit {

    @Input() line: any;
    @Input() showDetail: any;
    @Input() mainValue: string;

    constructor(private router: Router) {
    }

    ngOnInit() {
        console.log(this.line);
    }

    openDeelnemer(deelnemerId) {
        this.router.navigate(['/tabs/team', {id: deelnemerId}], {state: this.line});
    }
}
