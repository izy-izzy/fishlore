import {Component, Input, OnInit,} from '@angular/core';

export const enum FishIconType {
  WATER_SALINITY = 'water-salinity',
  VULNERABILITY = 'vulnerability',
  LENGTH = 'length',
  WEIGHT = 'weight'
}

@Component({
  selector: 'fish-icon',
  templateUrl: './fishicon.component.html',
  styleUrls: ['./fishicon.component.scss']
})
export class FishIconComponent implements OnInit {

  @Input() iconType: FishIconType;
  @Input() saltwater: number | string;
  @Input() brakish: number | string;
  @Input() vulnerability: number | string;
  @Input() weight: number | string;
  @Input() length: number | string;

  constructor() { }

  ngOnInit() {
  }

  public iconTypeIsWaterSalinity(): boolean {
     return this.iconType === FishIconType.WATER_SALINITY;
  }

  public iconTypeIsVulnerability(): boolean {
    return this.iconType === FishIconType.VULNERABILITY;
  }

  public iconTypeIsLength(): boolean {
    return this.iconType === FishIconType.LENGTH;
  }

  public iconTypeIsWeight(): boolean {
    return this.iconType === FishIconType.WEIGHT;
  }

}
