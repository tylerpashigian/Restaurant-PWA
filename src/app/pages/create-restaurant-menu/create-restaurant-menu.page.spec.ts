import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { IonicModule, IonRouterOutlet } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { of } from 'rxjs';

import { Category } from 'src/app/models/category';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { CreateRestaurantMenuPage } from './create-restaurant-menu.page';

describe('CreateRestaurantMenuPage', () => {
  let component: CreateRestaurantMenuPage;
  let fixture: ComponentFixture<CreateRestaurantMenuPage>;

  const category: Category = {
    title: "Test Category"
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRestaurantMenuPage ],
      imports: [
        FormsModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule
      ], 
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              restaurantId: 'hgiuogwhr',
            }),
          }
        },
        {
          provide: IonRouterOutlet,
          useValue: {
            category: category,
          }
        }
      ]
    }).compileComponents();

    const restaurantService = TestBed.get(RestaurantService);
    spyOn(restaurantService, 'initRestaurant').and.returnValue(Promise.resolve(null));
    spyOn(restaurantService, 'subscribeToCategories').and.returnValue(null);

    fixture = TestBed.createComponent(CreateRestaurantMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
