import { TestBed } from '@angular/core/testing';

import { FishlistService } from './fishlist.service';

describe('FishlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishlistService = TestBed.get(FishlistService);
    expect(service).toBeTruthy();
  });
});
