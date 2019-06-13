import { Injectable } from '@angular/core';
import { QueryFn, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Fish } from '../classes/fish.class';

@Injectable({
  providedIn: 'root'
})
export class CustomFishService {

  constructor(private db: AngularFirestore) { }

  public getFishList(): Observable<Fish[]> {
    return this.db.collection('species').valueChanges() as Observable<Fish[]>;
  }

  public getCustomFishItem(specCode: number): Observable<Fish[]> { 
    const q: QueryFn = ref => ref.where('SpecCode', '==', specCode);
    return this.db.collection('species', q).valueChanges() as Observable<Fish[]>;
  }

  public addCustomFishData(fish: Fish): Promise<void> {
    return this.db.doc('species/' + fish.SpecCode).set(fish); 
  }

  public removeCustomFishData(fish: Fish): Promise<void> {
    return this.db.doc('species/' +  fish.SpecCode).delete();
  }

  public overideCustomFishData(fish: Fish): Promise<void> {
    return this.db.doc('species/' +  fish.SpecCode).set(fish);
  }
}
