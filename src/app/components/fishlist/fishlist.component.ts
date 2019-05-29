import { Component, OnInit } from '@angular/core';
import {Fish} from '../../classes/fish.class';
import {FishstoreService} from '../../services/fishstore.service';
import {Observable, Subscription} from 'rxjs';
import {IFishDataResponse} from '../../services/api/fishbase.service';

export interface IPagination {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

@Component({
  selector: 'fish-list',
  templateUrl: './fishlist.component.html',
  styleUrls: ['./fishlist.component.scss']
})
export class FishlistComponent implements OnInit {

  private fishList: Fish[];
  private listSubscription: Subscription;
  public pagination: IPagination = {
    currentPage: 0,
    totalItems: undefined,
    itemsPerPage: 15
  }

  constructor(private fishstore: FishstoreService) { }

  ngOnInit() {
    this.updateFishList();
  }

  public changePage(page: number): void {
    this.pagination.currentPage = page;
    this.updateFishList();
  }

  private updateFishList(): void {
    this.listSubscription = this.fishstore.getFishList(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (response) => {
          this.fishList = response.data;
          this.pagination.totalItems = response.count;
        }, (error) => {
          alert(error); // should be better
        }, () => {
          this.listSubscription.unsubscribe();
        }
      );
  }

}
