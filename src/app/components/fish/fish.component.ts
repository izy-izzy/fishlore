import { Component, OnInit, Input } from '@angular/core';
import {Fish} from '../../classes/fish.class';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fish-info',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.scss']
})

export class FishComponent implements OnInit {

  @Input() fish: Fish;

  // public temporalFishName: string;
  // public nameChangeEnabled = false;

  constructor() { }

  ngOnInit() {
  }

  // public toggleNameChange(): void {
  //   if (this.nameChangeEnabled) {
  //     this.changeFishName();
  //   } else {
  //     this.temporalFishName = this.temporalFishName ? this.temporalFishName : (this.fish ? this.fish.FBname : '');
  //   }
  //   this.nameChangeEnabled = !this.nameChangeEnabled;
  // }
  //
  // public changeFishName(): void {
  //   this.fish.FBname = this.temporalFishName;
  // }

  public getGoogleImagesLink(): string {
    return 'https://www.google.com/search?q='+ this.fish.Genus + '+' +this.fish.Species + '&source=lnms&tbm=isch&sa=X';
  }

  public getPrefferedImage(): string {
    return 'https://www.fishbase.de/images/thumbnails/jpg/tn_' + this.fish.PicPreferredName;
  }

}
