import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, noop } from 'rxjs';
import { FishstoreService } from '../../services/fishstore.service';
import { Fish } from '../../classes/fish.class';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { CustomFishService } from '../../services/custom-fish.service';

@Component({
  selector: 'fish-detail',
  templateUrl: './fish-detail.component.html',
  styleUrls: ['./fish-detail.component.scss']
})
export class FishDetailComponent implements OnInit {

  private fishSpecCode: number;
  private dataSubscription: Subscription;
  private fish: Fish;
  public customFishData: Fish;
  private customFishSubscription: Subscription;
  public loading: boolean;

  constructor(
    private activatedRoute:ActivatedRoute,
    private fishStore: FishstoreService,
    private db: CustomFishService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.fishSpecCode = Number(params.specCode)
      this.loadFishData(this.fishSpecCode);
      this.loadCustomFishData(this.fishSpecCode);
    });
  }

  ngOnDestroy() {
    this.customFishSubscription ? this.customFishSubscription.unsubscribe() : noop();
    this.dataSubscription ? this.dataSubscription.unsubscribe() : noop();
  }

  private loadCustomFishData(specCode: number) {
    this.customFishSubscription = this.db.getCustomFishItem(specCode)
      .subscribe((data) => {
        if (data.length > 0){
          this.customFishData = data[0];
        } else {
          this.customFishData = undefined;
        }
      });
  }

  private loadFishData(specCode: number) {
    this.loading = true;
    this.dataSubscription = this.fishStore.getFishDetail(specCode)
      .subscribe((data) => {
        this.fish = data.data[0];
      }, (error) => {
        // DNK NOW
      }, () => {
        this.loading = false;
        this.dataSubscription.unsubscribe();
      });
  }

  public getGoogleImagesLink(): string {
    return 'https://www.google.com/search?q='+ this.fish.Genus + '+' +this.fish.Species + '&source=lnms&tbm=isch&sa=X';
  }

  public addCustomFishData() : void {
    this.db.addCustomFishData(this.fish);
  }

  public removeCustomFishData() : void{
    this.db.removeCustomFishData(this.fish);
  }

  public overideCustomFishData() : void {
    this.db.overideCustomFishData(this.fish);
  }
  
}
