import { Component, OnInit } from '@angular/core';
import { CustomFishService } from '../../services/custom-fish.service';
import { Fish } from '../../classes/fish.class';

@Component({
  selector: 'app-custom-fish-list',
  templateUrl: './custom-fish-list.component.html',
  styleUrls: ['./custom-fish-list.component.scss']
})
export class CustomFishListComponent implements OnInit {

  public fishList: Fish[];

  constructor(private db: CustomFishService) { 
  }

  ngOnInit() {
    this.db.getFishList().subscribe((list: Fish[]) => {
      this.fishList = list;
      console.log(this.fishList);
    })

  }

}
