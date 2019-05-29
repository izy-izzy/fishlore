import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {FishbaseService, IFishDataResponse} from './api/fishbase.service';

@Injectable({
  providedIn: 'root'
})
export class FishstoreService {

  constructor(private fishAPI: FishbaseService) { }

  public getFishList(page: number, perpage: number): Observable<IFishDataResponse> {
    // return of(this.fishList);
    return this.fishAPI.getFishList(perpage, page * perpage);
  }
}
