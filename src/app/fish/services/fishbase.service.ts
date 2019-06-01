import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Fish, FishExtended } from '../classes/fish.class';

export interface IFishTaxonomySearchResponse {
  count: number;
  data: Fish[];
  error: string;
  returned: number;
}

export interface IFishSpeciesSearchResponse {
  count: number;
  data: FishExtended[];
  error: string;
  returned: number;
}

export interface IFishSearchTaxonomyParams { 
  limit?: number,
  offset?: number,
  Species?: string,
  Genus?: string
}

export const enum IFishBaseErrorCode {
  OK = 200,
  NOT_FOUND = 400,
  NO_RESOURCE = 404
}

@Injectable({
  providedIn: 'root'
})
export class FishbaseService {

  // https://fishbaseapi.readme.io/docs/taxa
  private fishBaseUrl = 'https://fishbase.ropensci.org';
  private fishBaseUrlTaxonomy = 'https://fishbase.ropensci.org/taxa';
  private fishBaseUrlSpecies = 'https://fishbase.ropensci.org/species';

  constructor(private http: HttpClient) { }

  public getFish(specCode: number): Observable<IFishSpeciesSearchResponse> {
    return this.http.get<IFishSpeciesSearchResponse>(this.fishBaseUrlSpecies + '/' + specCode);
  }

  public getFishList(params: IFishSearchTaxonomyParams): Observable<IFishTaxonomySearchResponse> {
    return this.http.get<IFishTaxonomySearchResponse>(this.fishBaseUrlTaxonomy, {params: params as any} );
  }
}
