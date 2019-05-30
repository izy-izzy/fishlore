import {Component, Input, OnInit,} from '@angular/core';

export const enum FishIconType {
  WATER_SALINITY = 'water-salinity',
  VULNERABILITY = 'vulnerability'
}

@Component({
  selector: 'fish-icon',
  templateUrl: './fishicon.component.html',
  styleUrls: ['./fishicon.component.scss']
})
export class FishIconComponent implements OnInit {

  @Input() iconType: FishIconType;
  @Input() value: number | string;

  constructor() { }

  ngOnInit() {
  }

  public iconTypeIsWaterSalinity(): boolean {
     return this.iconType === FishIconType.WATER_SALINITY;
  }

  public iconTypeIsVulnerability(): boolean {
    return this.iconType === FishIconType.VULNERABILITY;
  }

}
