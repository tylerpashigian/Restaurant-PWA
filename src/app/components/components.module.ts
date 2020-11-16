import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuItemsComponent } from './menu-items/menu-items.component'
import { AddItemModalComponent } from './modals/add-item-modal/add-item-modal.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddItemModalComponent,
    MenuItemsComponent
  ],
  exports: [
    AddItemModalComponent,
    MenuItemsComponent
  ]
})

export class ComponentsModule {}
