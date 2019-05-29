import { TestBed } from '@angular/core/testing';

import { FishstoreService } from './fishstore.service';

describe('FishstoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishstoreService = TestBed.get(FishstoreService);
    expect(service).toBeTruthy();
  });
});
