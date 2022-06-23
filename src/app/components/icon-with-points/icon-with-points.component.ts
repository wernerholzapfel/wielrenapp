import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-with-points',
  templateUrl: './icon-with-points.component.html',
  styleUrls: ['./icon-with-points.component.scss'],
})
export class IconWithPointsComponent implements OnInit {

  @Input() points: number;
  @Input() image: string;
  constructor() { }

  ngOnInit() {}

}
