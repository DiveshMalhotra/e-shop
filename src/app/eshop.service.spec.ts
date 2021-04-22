import { TestBed } from '@angular/core/testing';

import { EshopService } from './eshop.service';

describe('EshopService', () => {
  let service: EshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
