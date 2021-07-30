import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { LoginDrawerComponent } from './login-drawer.component';

describe('LoginDrawerComponent', () => {
  let component: LoginDrawerComponent;
  let fixture: ComponentFixture<LoginDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDrawerComponent ],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
