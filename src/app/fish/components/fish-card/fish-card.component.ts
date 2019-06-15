import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomFish } from '../../services/custom-fish.service';

@Component({
  selector: 'fish-card',
  templateUrl: './fish-card.component.html',
  styleUrls: ['./fish-card.component.scss']
})
export class FishCardComponent implements OnInit {

  @Input() fish: CustomFish;
  constructor() { }

  ngOnInit() {
  }

  public getFishFullName(): string {
    return this.fish.Genus + ' ' + this.fish.Species;
  }

}
