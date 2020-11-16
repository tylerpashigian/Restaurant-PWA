import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateRestaurantAccountPageRoutingModule } from './create-restaurant-account-routing.module';

import { ComponentsModule } from '../../components/components.module'

import { CreateRestaurantAccountPage } from './create-restaurant-account.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    CreateRestaurantAccountPageRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [CreateRestaurantAccountPage]
})
export class CreateRestaurantAccountPageModule {}
