import { TestBed } from '@angular/core/testing';

import { ProductscService } from './products.service';

describe('ProductscService', () => {
  let service: ProductscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
