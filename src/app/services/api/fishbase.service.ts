import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Fish} from '../../classes/fish.class';

export interface IFishDataResponse {
  count: number;
  data: Fish[];
  error: string;
  returned: number;
}

@Injectable({
  providedIn: 'root'
})
export class FishbaseService {

  // https://fishbaseapi.readme.io/docs/taxa
  private fishBaseUrl = 'https://fishbase.ropensci.org/species';

  constructor(private http: HttpClient) { }

  public getFish(id: number): Observable<Fish[]> {
    return this.http.get<Fish[]>(this.fishBaseUrl + '/' + id);
  }

  public getFishList(limit: number, offset: number): Observable<IFishDataResponse> {
    return this.http.get<IFishDataResponse>(this.fishBaseUrl + '?limit=' + limit + '&offset=' + offset);
  }
}
