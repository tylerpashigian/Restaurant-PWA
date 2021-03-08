import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DynamicDrawerComponent } from 'src/app/models/dynamicDrawerItem';

import { CartPreviewComponent } from './cart-preview.component';

describe('CartPreviewComponent', () => {
  let component: CartPreviewComponent;
  let fixture: ComponentFixture<CartPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPreviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    const drawerData: DynamicDrawerComponent = { data: { previewCtaText: "test" } };

    fixture = TestBed.createComponent(CartPreviewComponent);
    component = fixture.componentInstance;
    component.data = drawerData;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
