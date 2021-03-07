import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DynamicDrawerComponent } from 'src/app/models/dynamicDrawerItem';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    const drawerData: DynamicDrawerComponent = { data: { name: "test" } };

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    component.data = drawerData;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
