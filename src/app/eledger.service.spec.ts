import { TestBed } from '@angular/core/testing';

import { EledgerService } from './eledger.service';

describe('EledgerService', () => {
  let service: EledgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EledgerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
