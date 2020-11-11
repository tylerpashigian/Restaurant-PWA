import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItemCardComponent } from './cards/menu-item-card/menu-item-card.component'
import { AddItemModalComponent } from './modals/add-item-modal/add-item-modal.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddItemModalComponent,
    MenuItemCardComponent
  ],
  exports: [
    AddItemModalComponent,
    MenuItemCardComponent
  ]
})

export class ComponentsModule {}
