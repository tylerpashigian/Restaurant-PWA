import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRestaurantMenuPageRoutingModule } from './create-restaurant-menu-routing.module';

import { CreateRestaurantMenuPage } from './create-restaurant-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRestaurantMenuPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateRestaurantMenuPage]
})
export class CreateRestaurantMenuPageModule {}
