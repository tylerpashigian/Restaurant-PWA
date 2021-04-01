import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';

import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  let service: RestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ IonicStorageModule.forRoot() ]
    });
    service = TestBed.inject(RestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
