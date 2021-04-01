import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AddItemModalComponent } from './add-item-modal.component';

describe('AddItemModalComponent', () => {
  let component: AddItemModalComponent;
  let fixture: ComponentFixture<AddItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemModalComponent ],
      imports: [
        FormsModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        ReactiveFormsModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddItemModalComponent);
    component = fixture.componentInstance;
    component.category = {
      title: "Test",
      menuItems: []
    }
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
