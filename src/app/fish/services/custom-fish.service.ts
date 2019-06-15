import { Injectable } from '@angular/core';
import { QueryFn, AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { FishExtended } from '../classes/fish.class';
import { FishstoreService } from './fishstore.service';
import { IFishSpeciesSearchResponse } from './fishbase.service';
import { take } from 'rxjs/operators';

export interface CustomFish extends FishExtended{
}

export interface IFishListUpdateProgress {
  processed: number,
  total: number,
  started: number,
  failed: number,
  processedItems: string[],
  errors: string[],
  activeWorkers?: number,
  finished: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CustomFishService {

  private fishListToUpdate: number[];
  private fishListUpdateProgress: IFishListUpdateProgress;
  private fishListUpdateProgressObservable: BehaviorSubject<IFishListUpdateProgress>
  private defaultActiveWorkesForUpdate: number = 5;

  constructor(
    private db: AngularFirestore,
    private fishStore: FishstoreService
    ) { }

  public getFishList(): Observable<CustomFish[]> {
    return this.db.collection('species').valueChanges() as Observable<CustomFish[]>;
  }

  public getCustomFishItem(specCode: number): Observable<CustomFish[]> { 
    const q: QueryFn = ref => ref.where('SpecCode', '==', specCode);
    return this.db.collection('species', q).valueChanges() as Observable<CustomFish[]>;
  }

  public addCustomFishData(fish: CustomFish): Promise<void> {
    return this.db.doc('species/' + fish.SpecCode).set(fish); 
  }

  public removeCustomFishData(fish: CustomFish): Promise<void> {
    return this.db.doc('species/' +  fish.SpecCode).delete();
  }

  public overideCustomFishData(fish: CustomFish): Promise<void> {
    return this.db.doc('species/' +  fish.SpecCode).set(fish);
  }

  public updateCustomFish(ids: number[]): Observable<IFishListUpdateProgress> {

    this.fishListToUpdate = ids;

    this.fishListUpdateProgress = {
      processed : 0,
      total: ids.length,
      started: 0,
      failed: 0,
      processedItems: [],
      errors: [],
      finished: false,
      activeWorkers: 0
    }

    this.fishListUpdateProgressObservable = new BehaviorSubject<IFishListUpdateProgress>(this.fishListUpdateProgress);

    for(let workerId = 0; workerId < this.defaultActiveWorkesForUpdate; workerId++){
      this.fishListUpdateProgress.activeWorkers++;
      this.fishListUpdateProgressObservable.next(this.fishListUpdateProgress);
      this.updateFishFromList();
    }

    return this.fishListUpdateProgressObservable;
  }

  private updateFishFromList(): void {
    if (this.fishListToUpdate.length) {
      const fishSpecCodeToUpdate: number = this.fishListToUpdate.pop();
      this.updateFish(fishSpecCodeToUpdate)
        .finally(() => {
          this.updateFishFromList();
        })
    } else {
      this.fishListUpdateProgress.activeWorkers--;
      if (this.fishListUpdateProgress.activeWorkers === 0) {
        this.fishListUpdateProgress.finished = true;
      }
      this.fishListUpdateProgressObservable.next(this.fishListUpdateProgress);
    }
  }

  private updateFish(specCode: number): Promise<boolean> {
    this.fishListUpdateProgress.started++;
    this.fishListUpdateProgressObservable.next(this.fishListUpdateProgress)
    const promise = new Promise<boolean>((resolve, reject) => {
      this.fishStore.getFishDetail(specCode).pipe(take(1))
      .subscribe((data: IFishSpeciesSearchResponse) => {
        if (data.data.length) {
          const fish: FishExtended = data.data[0];
          this.overideCustomFishData(fish)
            .then((data) => {
              this.fishListUpdateProgress.processed++;
              this.fishListUpdateProgress.processedItems.push(fish.Genus + ' ' + fish.Species);
              resolve(true);
            }, (error) => {
              this.fishListUpdateProgress.failed++;
              this.fishListUpdateProgress.processedItems.push(fish.Genus + ' ' + fish.Species);
              this.fishListUpdateProgress.errors.push(error);
              reject(error);
            })
            .finally(() => {
              this.fishListUpdateProgressObservable.next(this.fishListUpdateProgress);
            })
        } else {
          this.fishListUpdateProgress.failed++;
          const error: string = 'Unable to retrieve data for specCode: ' + specCode;
          this.fishListUpdateProgress.errors.push(error);
          reject(error);
        }
      }, (error) => {
        this.fishListUpdateProgress.failed++;
        this.fishListUpdateProgress.errors.push(error);
        reject(error);
      });
    });
   
  

  return promise;
  }

}
