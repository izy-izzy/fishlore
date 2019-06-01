import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fish, FishExtended } from '../classes/fish.class';
import { FishbaseService, IFishSearchTaxonomyParams, IFishTaxonomySearchResponse, IFishSpeciesSearchResponse } from './fishbase.service';

@Injectable({
  providedIn: 'root'
})
export class FishstoreService {

  constructor(private fishAPI: FishbaseService) { }

  public getFishDetail(specCode: number): Observable<IFishSpeciesSearchResponse> {
    return this.fishAPI.getFish(specCode)
      .pipe(map((response) => {
        this.postprocessFishDataResponse(response);
        return response;
      }));
  }

  public getFishList(params: IFishSearchTaxonomyParams): Observable<IFishTaxonomySearchResponse> {
    return this.fishAPI.getFishList(params)
  }

  private postprocessFishDataResponse(response: IFishSpeciesSearchResponse): void {
    response.data.forEach((fish) => {
      fish.PicLink = this.getPrefferedImage(fish);
    })
  }

  public getPrefferedImage(fish: FishExtended): string {
    return fish.PicPreferredName ? 'https://www.fishbase.de/images/thumbnails/' + this.getTypeOfPicture(fish.PicPreferredName) + '/tn_' + fish.PicPreferredName : undefined;
  }

  private getTypeOfPicture(filename: string): string {
    const chunks:string[] = filename.split('.');
    return chunks[chunks.length-1];
  }
}
