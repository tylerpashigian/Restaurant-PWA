import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRestaurantMenuPage } from './create-restaurant-menu.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRestaurantMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRestaurantMenuPageRoutingModule {}
