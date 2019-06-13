import { TestBed } from '@angular/core/testing';

import { CustomFishService } from './custom-fish.service';

describe('CustomFishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomFishService = TestBed.get(CustomFishService);
    expect(service).toBeTruthy();
  });
});
