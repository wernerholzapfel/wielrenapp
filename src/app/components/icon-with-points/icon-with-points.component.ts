import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UiServiceService} from '../../services/ui-service.service';

@Component({
  selector: 'app-icon-with-points',
  templateUrl: './icon-with-points.component.html',
  styleUrls: ['./icon-with-points.component.scss'],
})
export class IconWithPointsComponent implements OnInit {

  @Input() points: number;
  @Input() image: string;
  tourHasEnded: boolean;

  constructor(private uiService: UiServiceService) {
  }

  ngOnInit() {
    this.tourHasEnded = this.uiService.selectedTour.hasEnded;

  }

}
