import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-punten-col',
  templateUrl: './punten-col.component.html',
  styleUrls: ['./punten-col.component.scss'],
})
export class PuntenColComponent implements OnInit {

  @Input() punten: number;
  @Input() deltaPunten: number;
  @Input() showDelta = true;

  constructor() { }

  ngOnInit() {}

}
