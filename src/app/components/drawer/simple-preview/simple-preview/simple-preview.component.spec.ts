import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DynamicDrawerComponent } from 'src/app/models/dynamicDrawerItem';

import { SimplePreviewComponent } from './simple-preview.component';

describe('CartPreviewComponent', () => {
  let component: SimplePreviewComponent;
  let fixture: ComponentFixture<SimplePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePreviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    const drawerData: DynamicDrawerComponent = { data: { previewCtaText: "Open Preview" } };

    fixture = TestBed.createComponent(SimplePreviewComponent);
    component = fixture.componentInstance;
    component.data = drawerData;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
