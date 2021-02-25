import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';

import { Category } from 'src/app/models/category';
import { CreateRestaurantMenuPage } from './create-restaurant-menu.page';
import { IonicStorageModule } from '@ionic/storage';

describe('CreateRestaurantMenuPage', () => {
  let component: CreateRestaurantMenuPage;
  let fixture: ComponentFixture<CreateRestaurantMenuPage>;

  const category: Category = {
    title: "Test Category"
  }

  beforeEach(async(() => {
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
          provide: IonRouterOutlet,
          useValue: {
            category: category,
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRestaurantMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
