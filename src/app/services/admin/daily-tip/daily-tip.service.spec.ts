import { TestBed } from '@angular/core/testing';

import { DailyTipService } from './daily-tip.service';

describe('DailyTipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyTipService = TestBed.get(DailyTipService);
    expect(service).toBeTruthy();
  });
});
