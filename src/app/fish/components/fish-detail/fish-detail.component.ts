import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, noop } from 'rxjs';
import { FishstoreService } from '../../services/fishstore.service';
import { Fish } from '../../classes/fish.class';
import { CustomFishService, CustomFish } from '../../services/custom-fish.service';
import { ModalMessageDialogComponent } from 'src/app/shared/components/modal-message/modal-message.component';
import { MatDialog } from '@angular/material';
import { take } from 'rxjs/operators';

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
    private customFishService: CustomFishService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
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
    this.customFishService.getCustomFishItem(specCode).pipe(take(1))
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
    this.fishStore.getFishDetail(specCode).pipe(take(1))
      .subscribe((data) => {
        this.fish = data.data[0];
      }, (error) => {
        this.openDialog(error);
      }, () => {
        this.loading = false;
      });
  }

  private openDialog(message: string): void {
    const dialogRef = this.dialog.open(ModalMessageDialogComponent, {
      width: '450px',
      data: message
    });
  }

  public getGoogleImagesLink(): string {
    return 'https://www.google.com/search?q='+ this.fish.Genus + '+' +this.fish.Species + '&source=lnms&tbm=isch&sa=X';
  }

  public addCustomFishData() : void {
    this.customFishService.addCustomFishData(this.fish as CustomFish)
      .then((data) => {

      }, (error) => {
        window.alert('ERROR 893145');
      })
      .finally(() => {
        this.loadCustomFishData(this.fishSpecCode);
      })
  }

  public removeCustomFishData() : void{
    this.customFishService.removeCustomFishData(this.fish as CustomFish)
    .then((data) => {

    }, (error) => {
      window.alert('ERROR 684535');
    })
      .finally(() => {
        this.loadCustomFishData(this.fishSpecCode);
      })
  }

  public overideCustomFishData() : void {
    this.customFishService.overideCustomFishData(this.fish as CustomFish)
      .then((data) => {

      }, (error) => {
        window.alert('ERROR 83215847');
      })
      .finally(() => {
        this.loadCustomFishData(this.fishSpecCode);
      })
  }
  
}
