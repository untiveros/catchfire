import { TestBed, inject } from '@angular/core/testing';

import { GoalAreaService } from './goal-area.service';

describe('GoalAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalAreaService]
    });
  });

  it('should ...', inject([GoalAreaService], (service: GoalAreaService) => {
    expect(service).toBeTruthy();
  }));
});
