import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRestaurantMenuPageRoutingModule } from './create-restaurant-menu-routing.module';

import { ComponentsModule } from '../../components/components.module'

import { CreateRestaurantMenuPage } from './create-restaurant-menu.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    CreateRestaurantMenuPageRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [CreateRestaurantMenuPage]
})
export class CreateRestaurantMenuPageModule {}
