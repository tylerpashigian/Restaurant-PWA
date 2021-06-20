import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

import { MenuItemCardComponent } from './menu-item-card.component';

describe('MenuItemCardComponent', () => {
  let component: MenuItemCardComponent;
  let fixture: ComponentFixture<MenuItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();


    const firebaseService = TestBed.get(FirebaseService);
    spyOn(firebaseService, 'loadImage').and.returnValue(Promise.resolve(null));

    fixture = TestBed.createComponent(MenuItemCardComponent);
    component = fixture.componentInstance;
    component.menuItem = {
      title: "Menu Item",
      price: "3.50"
    }
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
