import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FishstoreService } from 'src/app/services/fishstore.service';
import { Subscription } from 'rxjs';
import { Fish } from 'src/app/classes/fish.class';

@Component({
  selector: 'fish-detail',
  templateUrl: './fish-detail.component.html',
  styleUrls: ['./fish-detail.component.scss']
})
export class FishDetailComponent implements OnInit {

  private fishSpecCode: number;
  private dataSubscription: Subscription;
  private fish: Fish;

  constructor(
    private activatedRoute:ActivatedRoute,
    private fishStore: FishstoreService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.fishSpecCode = Number(params.specCode)
      this.loadFishData(this.fishSpecCode);
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

}
