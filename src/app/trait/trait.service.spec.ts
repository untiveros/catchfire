import { TestBed, inject } from '@angular/core/testing';

import { TraitService } from './trait.service';

describe('TraitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TraitService]
    });
  });

  it('should ...', inject([TraitService], (service: TraitService) => {
    expect(service).toBeTruthy();
  }));
});
