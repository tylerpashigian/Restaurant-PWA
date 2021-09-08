import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

import { MenuItemCardComponent } from './menu-item-card.component';

describe('MenuItemCardComponent', () => {
  let component: MenuItemCardComponent;
  let fixture: ComponentFixture<MenuItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuItemCardComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    const firebaseService = TestBed.get(FirebaseService);
    spyOn(firebaseService, 'loadImage').and.returnValue(Promise.resolve(null));

    fixture = TestBed.createComponent(MenuItemCardComponent);
    component = fixture.componentInstance;
    // Creating default menu item
    if (!component.menuItem) {
      component.menuItem = {
        title: 'Menu Item',
        price: '3.50',
      };
    }
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the proper title', () => {
    expect(component.menuItem.title).toMatch('Menu Item');
  });

  it('should contain lines by default', () => {
    expect(component.lines).toBeTrue();
  });

  it('should display the proper price', () => {
    expect(component.menuItem.price).toMatch('3.50');
  });

  it('should allow for a custom menu item', () => {
    component.menuItem = {
      title: 'Custom Item',
      price: '100',
    };
    expect(component.menuItem.title).toMatch('Custom Item');
    expect(component.menuItem.price).toMatch('100');
  });

  it('should allow lines override', () => {
    component.lines = false;
    expect(component.lines).toBeFalse();
  });
});
