import { TestBed } from '@angular/core/testing';

import { GenericToastService } from './generic-toast.service';

describe('GenericToastService', () => {
  let service: GenericToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
