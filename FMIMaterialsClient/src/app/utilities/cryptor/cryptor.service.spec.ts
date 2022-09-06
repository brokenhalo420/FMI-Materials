import { TestBed } from '@angular/core/testing';

import { CryptorService } from './cryptor.service';

describe('CryptorService', () => {
  let service: CryptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
