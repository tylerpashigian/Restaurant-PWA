import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePage } from './home.page';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IonicStorageModule } from '@ionic/storage';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        FormsModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
