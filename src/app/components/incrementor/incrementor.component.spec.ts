import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncrementorComponent } from './incrementor.component';

describe('IncrementorComponent', () => {
  let component: IncrementorComponent;
  let fixture: ComponentFixture<IncrementorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrementorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncrementorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
