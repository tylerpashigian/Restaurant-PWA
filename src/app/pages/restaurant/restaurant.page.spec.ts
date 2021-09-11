import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

import { RestaurantPage } from './restaurant.page';

describe('RestaurantPage', () => {
  let component: RestaurantPage;
  let fixture: ComponentFixture<RestaurantPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantPage ],
      imports: [ IonicModule.forRoot(), IonicStorageModule.forRoot() ],
      providers: [ 
        {
          provide: ActivatedRoute,
          useValue: { 
            snapshot: { 
              paramMap: convertToParamMap({
                restaurantId: 'hgiuogwhr', 
                tableId: '5'
              })
            } 
          }
        },
      ]
    }).compileComponents();

    const restaurantService = TestBed.get(RestaurantService);
    spyOn(restaurantService, 'initRestaurant').and.returnValue(Promise.resolve(null));

    fixture = TestBed.createComponent(RestaurantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
