import { Component, OnInit, Input } from '@angular/core';
import { Fish } from '../../classes/fish.class';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fish-info',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.scss']
})

export class FishComponent implements OnInit {

  @Input() fish: Fish;

  constructor() { }

  ngOnInit() {}

  public getGoogleImagesLink(): string {
    return 'https://www.google.com/search?q='+ this.fish.Genus + '+' +this.fish.Species + '&source=lnms&tbm=isch&sa=X';
  }

}
