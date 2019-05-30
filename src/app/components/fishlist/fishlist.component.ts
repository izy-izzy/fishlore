import { Component, OnInit } from '@angular/core';
import { Fish } from '../../classes/fish.class';
import { FishstoreService } from '../../services/fishstore.service';
import { Subscription } from 'rxjs';
import { IPagination } from '../pagination/pagination.component';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'fish-list',
  templateUrl: './fishlist.component.html',
  styleUrls: ['./fishlist.component.scss']
})
export class FishlistComponent implements OnInit {

  public fishList: Fish[];
  private listSubscription: Subscription;
  public pagination: IPagination = {
    currentPage: 0,
    totalItems: undefined,
    itemsPerPage: 10
  }

  constructor(private fishstore: FishstoreService) { }

  ngOnInit() {
    this.updateFishList();
  }

  public changePage(page: PageEvent): void {
    this.pagination.currentPage = page.pageIndex;
    this.pagination.itemsPerPage = page.pageSize;
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
