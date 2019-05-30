import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {FishbaseService, IFishDataResponse} from './api/fishbase.service';
import { Fish } from '../classes/fish.class';

@Injectable({
  providedIn: 'root'
})
export class FishstoreService {

  constructor(private fishAPI: FishbaseService) { }

  public getFishDetail(specCode: number): Observable<IFishDataResponse> {
    return this.fishAPI.getFish(specCode)
      .pipe(map((response) => {
        this.postprocessFishDataResponse(response);
        return response;
      }));
  }

  public getFishList(page: number, perpage: number): Observable<IFishDataResponse> {
    return this.fishAPI.getFishList(perpage, page * perpage)
      .pipe(map((response) => {
          this.postprocessFishDataResponse(response);
          return response;
      }));
  }

  private postprocessFishDataResponse(response: IFishDataResponse): void {
    response.data.forEach((fish) => {
      fish.PicLink = this.getPrefferedImage(fish);
    })
  }

  public getPrefferedImage(fish: Fish): string {
    return fish.PicPreferredName ? 'https://www.fishbase.de/images/thumbnails/' + this.getTypeOfPicture(fish.PicPreferredName) + '/tn_' + fish.PicPreferredName : undefined;
  }

  private getTypeOfPicture(filename: string): string {
    const chunks:string[] = filename.split('.');
    return chunks[chunks.length-1];
  }
}
