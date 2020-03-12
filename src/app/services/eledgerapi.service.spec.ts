import { TestBed } from '@angular/core/testing';

import { EledgerApiService } from './eledgerapi.service';

describe('EledgerService', () => {
  let service: EledgerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EledgerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
