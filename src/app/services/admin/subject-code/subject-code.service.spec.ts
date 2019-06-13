import { TestBed } from '@angular/core/testing';

import { SubjectCodeService } from './subject-code.service';

describe('SubjectCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectCodeService = TestBed.get(SubjectCodeService);
    expect(service).toBeTruthy();
  });
});
