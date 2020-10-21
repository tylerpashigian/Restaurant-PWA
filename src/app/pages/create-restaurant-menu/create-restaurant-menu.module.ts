import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRestaurantMenuPageRoutingModule } from './create-restaurant-menu-routing.module';

import { CreateRestaurantMenuPage } from './create-restaurant-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRestaurantMenuPageRoutingModule
  ],
  declarations: [CreateRestaurantMenuPage]
})
export class CreateRestaurantMenuPageModule {}
