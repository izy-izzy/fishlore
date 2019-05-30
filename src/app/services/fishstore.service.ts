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

  public getFishList(page: number, perpage: number): Observable<IFishDataResponse> {
    return this.fishAPI.getFishList(perpage, page * perpage)
      .pipe(map((response) => {
          response.data.forEach((fish) => {
            fish.PicLink = this.getPrefferedImage(fish);
          })
          return response;
      }));
  }

  public getPrefferedImage(fish: Fish): string {
    return fish.PicPreferredName ? 'https://www.fishbase.de/images/thumbnails/' + this.getTypeOfPicture(fish.PicPreferredName) + '/tn_' + fish.PicPreferredName : undefined;
  }

  private getTypeOfPicture(filename: string): string {
    const chunks:string[] = filename.split('.');
    return chunks[chunks.length-1];
  }
}
