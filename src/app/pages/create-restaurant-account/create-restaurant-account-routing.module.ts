import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRestaurantAccountPage } from './create-restaurant-account.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRestaurantAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRestaurantAccountPageRoutingModule {}
