import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { RestaurantPage } from './restaurant.page';

describe('RestaurantPage', () => {
  let component: RestaurantPage;
  let fixture: ComponentFixture<RestaurantPage>;

  beforeEach(async(() => {
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

    fixture = TestBed.createComponent(RestaurantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
