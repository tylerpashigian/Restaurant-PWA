import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateRestaurantAccountPage } from './create-restaurant-account.page';

describe('CreateRestaurantAccountPage', () => {
  let component: CreateRestaurantAccountPage;
  let fixture: ComponentFixture<CreateRestaurantAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRestaurantAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRestaurantAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
