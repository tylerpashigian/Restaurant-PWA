import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateRestaurantAccountPage } from './create-restaurant-account.page';
import { IonicStorageModule } from '@ionic/storage';

describe('CreateRestaurantAccountPage', () => {
  let component: CreateRestaurantAccountPage;
  let fixture: ComponentFixture<CreateRestaurantAccountPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRestaurantAccountPage ],
      imports: [
        FormsModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRestaurantAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
