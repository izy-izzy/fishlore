import { Injectable } from '@angular/core';
import { IPagination } from 'src/app/shared/components/pagination/pagination.component';

@Injectable({
  providedIn: 'root'
})
export class FishlistService {

  private savedPagination: IPagination;
  private defaultPagination: IPagination = {
    currentPage: 0,
    totalItems: undefined,
    itemsPerPage: 10,
    pageSizeOptions: [5, 10, 20, 100]
  };
  private lastOpenedFishSpecCode: number;
  private query: string;

  constructor() {
    this.savedPagination = {...this.defaultPagination};
  }

  public saveSearchParamsAndPagination(pagination: IPagination, openedFishSpecCode: number, query: string): void {
    this.savedPagination = pagination;
    this.lastOpenedFishSpecCode = openedFishSpecCode;
    this.query = query;
  }

  public getSavedParamsAndPagination(): [IPagination, number, string] {
    return [this.savedPagination, this.lastOpenedFishSpecCode, this.query];
  }

}
