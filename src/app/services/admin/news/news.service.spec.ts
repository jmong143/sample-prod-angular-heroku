import { TestBed } from '@angular/core/testing';

import { AdminNewsService } from './news.service';

describe('NewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminNewsService = TestBed.get(AdminNewsService);
    expect(service).toBeTruthy();
  });
});
