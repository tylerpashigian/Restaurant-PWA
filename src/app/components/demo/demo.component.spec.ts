import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DynamicDrawerComponent } from 'src/app/models/dynamicDrawerItem';

import { DemoComponent } from './demo.component';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    const drawerData: DynamicDrawerComponent = { data: { name: "test" } };

    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    component.data = drawerData;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
