import { Component, OnInit } from '@angular/core';
import { Fish } from '../../classes/fish.class';
import { FishstoreService } from '../../services/fishstore.service';
import { Subscription, noop } from 'rxjs';
import { PageEvent } from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FishlistService} from '../../services/fishlist.service';
import { IPagination } from 'src/app/shared/components/pagination/pagination.component';
import { IFishListRouteParams } from '../../fish-routing.module';
import { IFishSearchTaxonomyParams, IFishBaseErrorCode } from '../../services/fishbase.service';
import { take } from 'rxjs/operators';

export const enum IFishListSearchType {
  SPECIES = 'Species',
  GENUS = 'Genus',
  ANY = 'Any'
}

@Component({
  selector: 'fish-list',
  templateUrl: './fishlist.component.html',
  styleUrls: ['./fishlist.component.scss']
})
export class FishlistComponent implements OnInit {

  public fishList: Fish[];
  public openedFishSpecCode: number;
  public pagination: IPagination;
  public query: string;
  public searchType: IFishListSearchType;
  public loading = false;
  public errorMessage: string;

  constructor(private fishstore: FishstoreService,
              private activatedRoute: ActivatedRoute,
              private fishlistService: FishlistService,
              private router: Router) { }

  ngOnInit() {
    [this.pagination, this.openedFishSpecCode] = this.fishlistService.getSavedParamsAndPagination();
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
      this.pagination.currentPage = params.currentPage ? Number(params.currentPage) : this.pagination.currentPage;
      this.pagination.itemsPerPage = params.itemsPerPage ? Number(params.itemsPerPage) : this.pagination.itemsPerPage;
      this.query = params.query ? params.query : this.query;
      this.openedFishSpecCode = params.openedFishSpecCode ? Number(params.openedFishSpecCode) : this.openedFishSpecCode;
      this.searchType = params.searchType ? params.searchType : this.searchType;
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
    params.query = this.query ? this.query : '';
    params.openedFishSpecCode = this.openedFishSpecCode ? this.openedFishSpecCode.toString() : '';
    params.searchType = this.searchType ? this.searchType : undefined;
    
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: params, 
        queryParamsHandling: "merge", // remove to replace all query params by provided
      });
    this.fishlistService.saveSearchParamsAndPagination(this.pagination, this.openedFishSpecCode, this.query);
  }

  public seachQueryChanged(queryValue: string): void { 
    this.query = queryValue;
    this.updateFishList();
  }

  public searchTypeChanged(event: MouseEvent): void {
    this.updateFishList();
  }

  private getSeachParmeters(): IFishSearchTaxonomyParams {
    const params: IFishSearchTaxonomyParams = {
      limit: this.pagination.itemsPerPage,
      offset: this.pagination.itemsPerPage * this.pagination.currentPage
    }
    if (this.query) {
      this.searchType === IFishListSearchType.SPECIES ? params.Species = this.query : noop;
      this.searchType === IFishListSearchType.GENUS ? params.Genus = this.query : noop;
    }
    return params;
  }


  private updateFishList(): void {
    this.saveParameters();
    this.loading = true;
    const params = this.getSeachParmeters();
    this.fishstore.getFishList(params).pipe(take(1))
      .subscribe(
        (response) => {
          this.fishList = response.data;
          this.pagination.totalItems = response.count + params.offset;
          if (this.pagination.currentPage > (this.pagination.totalItems / this.pagination.itemsPerPage)) {
            this.pagination.currentPage = 0;
            this.updateFishList();
          }
          this.errorMessage = undefined;
        }, (data) => {
          this.fishList = undefined;
          this.pagination.currentPage = 0;
          this.pagination.totalItems = 0;
          if (data.status === IFishBaseErrorCode.NOT_FOUND) {
            this.errorMessage = data.error.error.message;
          }
        },
        () => {
          this.loading = false;
        }
      );
  }

}
