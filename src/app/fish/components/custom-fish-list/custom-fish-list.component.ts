import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomFishService, CustomFish, IFishListUpdateProgress } from '../../services/custom-fish.service';
import { Subscription, noop } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-custom-fish-list',
  templateUrl: './custom-fish-list.component.html',
  styleUrls: ['./custom-fish-list.component.scss']
})
export class CustomFishListComponent implements OnInit {

  public fishList: CustomFish[];
  public updateSubscription: Subscription;
  public updateProgress: IFishListUpdateProgress

  constructor(private customFishService: CustomFishService) { 
  }

  ngOnInit() {
    this.customFishService.getFishList()
      .subscribe((list: CustomFish[]) => {
        this.fishList = list;
      });
  }

  ngOnDestroy() {
    this.updateSubscription ? this.updateSubscription.unsubscribe() : noop;
  }

  public updateAllFishFromFishDB(): void {
    const specCodes:number[] = this.fishList.map((fish: CustomFish) => {
      return fish.SpecCode;
    })
    this.updateSubscription = this.customFishService.updateCustomFish(specCodes)
      .subscribe((data: IFishListUpdateProgress) => {
        this.updateProgress = data;
      })
  }
  
}
