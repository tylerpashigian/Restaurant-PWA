import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddItemModalComponent } from './modals/add-item-modal/add-item-modal.component'
import { CustomImageUploadComponent } from './util/custom-image-upload/custom-image-upload.component'
import { DrawerComponent } from './drawer/drawer.component';
import { MenuItemCardComponent } from './cards/menu-item-card/menu-item-card.component'
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { DrawerDirective } from '../directives/drawer/drawer.directive'
import { DrawerPreviewDirective } from '../directives/drawerPreview/drawer-preview.directive';
import { CartComponent } from './drawer/cart/cart/cart.component';
import { CartPreviewComponent } from './drawer/cart/cart-preview/cart-preview.component';
import { IncrementorComponent } from './incrementor/incrementor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddItemModalComponent,
    CartComponent,
    CartPreviewComponent,
    CustomImageUploadComponent,
    DrawerComponent,
    IncrementorComponent,
    MenuItemCardComponent,
    MenuItemsComponent,
    DrawerDirective,
    DrawerPreviewDirective
  ],
  exports: [
    AddItemModalComponent,
    CartComponent,
    CartPreviewComponent,
    CustomImageUploadComponent,
    DrawerComponent,
    IncrementorComponent,
    MenuItemCardComponent,
    MenuItemsComponent
  ]
})

export class ComponentsModule {}
