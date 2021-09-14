import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddItemModalComponent } from './modals/add-item-modal/add-item-modal.component';
import { CustomImageUploadComponent } from './util/custom-image-upload/custom-image-upload.component';
import { DrawerComponent } from './drawer/drawer.component';
import { MenuItemCardComponent } from './cards/menu-item-card/menu-item-card.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { DrawerDirective } from '../directives/drawer/drawer.directive';
import { DrawerPreviewDirective } from '../directives/drawerPreview/drawer-preview.directive';
import { CartComponent } from './drawer/cart/cart/cart.component';
import { SimplePreviewComponent } from './drawer/simple-preview/simple-preview/simple-preview.component';
import { IncrementorComponent } from './incrementor/incrementor.component';
import { LoginDrawerComponent } from './drawer/login-drawer/login-drawer.component';
import { IsUsersItemPipe } from '../pipes/is-users-item/is-users-item.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [
    AddItemModalComponent,
    CartComponent,
    CustomImageUploadComponent,
    DrawerComponent,
    DrawerDirective,
    DrawerPreviewDirective,
    IncrementorComponent,
    LoginDrawerComponent,
    MenuItemCardComponent,
    MenuItemsComponent,
    SimplePreviewComponent,
    IsUsersItemPipe,
  ],
  exports: [
    AddItemModalComponent,
    CartComponent,
    CustomImageUploadComponent,
    DrawerComponent,
    IncrementorComponent,
    LoginDrawerComponent,
    MenuItemCardComponent,
    MenuItemsComponent,
    SimplePreviewComponent,
    IsUsersItemPipe,
  ],
})
export class ComponentsModule {}
