import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateRestaurantAccountPageRoutingModule } from './create-restaurant-account-routing.module';

import { CreateRestaurantAccountPage } from './create-restaurant-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRestaurantAccountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateRestaurantAccountPage]
})
export class CreateRestaurantAccountPageModule {}
