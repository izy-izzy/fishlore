import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomFishService } from '../../services/custom-fish.service';
import { Fish } from '../../classes/fish.class';
import { Subscription, noop } from 'rxjs';

@Component({
  selector: 'app-custom-fish-list',
  templateUrl: './custom-fish-list.component.html',
  styleUrls: ['./custom-fish-list.component.scss']
})
export class CustomFishListComponent implements OnInit {

  public fishList: Fish[];
  public subscription: Subscription;

  constructor(private customFishService: CustomFishService) { 
  }

  ngOnInit() {
    this.subscription = this.customFishService.getFishList()
      .subscribe((list: Fish[]) => {
        this.fishList = list;
      });
  }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : noop();
  }
  
}
