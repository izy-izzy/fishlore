import { TestBed } from '@angular/core/testing';

import { FishbaseService } from './fishbase.service';

describe('FishbaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishbaseService = TestBed.get(FishbaseService);
    expect(service).toBeTruthy();
  });
});
