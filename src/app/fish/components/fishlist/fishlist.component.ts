import { Component, OnInit } from '@angular/core';
import { Fish } from '../../classes/fish.class';
import { FishstoreService } from '../../services/fishstore.service';
import { Subscription, noop } from 'rxjs';
import { PageEvent } from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FishlistService} from '../../services/fishlist.service';
import {Location} from '@angular/common';
import { IPagination } from 'src/app/shared/components/pagination/pagination.component';
import { IFishListRouteParams } from '../../fish-routing.module';

@Component({
  selector: 'fish-list',
  templateUrl: './fishlist.component.html',
  styleUrls: ['./fishlist.component.scss']
})
export class FishlistComponent implements OnInit {

  public fishList: Fish[];
  private listSubscription: Subscription;
  public openedFishSpecCode: number;
  public pagination: IPagination;
  public loading = false;

  constructor(private fishstore: FishstoreService,
              private activatedRoute: ActivatedRoute,
              private fishlistService: FishlistService,
              private router: Router) { }

  ngOnInit() {
    [this.pagination, this.openedFishSpecCode] = this.fishlistService.getSavedParamsAndPagination();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.pagination.currentPage = params.currentPage ? Number(params.currentPage) : this.pagination.currentPage;
      this.pagination.itemsPerPage = params.itemsPerPage ? Number(params.itemsPerPage) : this.pagination.itemsPerPage;
      this.openedFishSpecCode = params.openedFishSpecCode ? Number(params.openedFishSpecCode) : this.openedFishSpecCode;
    });
    this.updateFishList();

  }

  public changePage(page: PageEvent): void {
    this.pagination.currentPage = page.pageIndex;
    this.pagination.itemsPerPage = page.pageSize;
    this.updateFishList();
  }

  public toggleFishOpen(fish: Fish): void {
    this.openedFishSpecCode = fish.SpecCode;
    this.saveParameters();
  }

  public toggleFishClose(fish: Fish): void {
    this.openedFishSpecCode === fish.SpecCode ? this.openedFishSpecCode = undefined: undefined;
    this.saveParameters();
  }

  public saveParameters(): void {
    const params: IFishListRouteParams = {
      currentPage: this.pagination.currentPage.toString(),
      itemsPerPage: this.pagination.itemsPerPage.toString()
    }
    this.openedFishSpecCode ? params.openedFishSpecCode = this.openedFishSpecCode.toString() : noop;
    
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: params, 
        queryParamsHandling: "merge", // remove to replace all query params by provided
      });
    this.fishlistService.saveSearchParamsAndPagination(this.pagination, this.openedFishSpecCode);
  }

  private updateFishList(): void {
    this.saveParameters();
    this.loading = true;
    this.listSubscription = this.fishstore.getFishList(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (response) => {
          this.fishList = response.data;
          this.pagination.totalItems = response.count;
          if (this.pagination.currentPage > (this.pagination.totalItems / this.pagination.itemsPerPage)) {
            this.pagination.currentPage = 0;
            this.updateFishList();
          }
        }, (error) => {
          alert(error); // should be better
        }, () => {
          this.loading = false;
          this.listSubscription.unsubscribe();
        }
      );
  }

}
