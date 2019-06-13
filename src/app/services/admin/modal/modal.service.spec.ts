import { TestBed } from '@angular/core/testing';

import { AdminModalService } from './modal.service';

describe('AdminModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminModalService = TestBed.get(AdminModalService);
    expect(service).toBeTruthy();
  });
});
