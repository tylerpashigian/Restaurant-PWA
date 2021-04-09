import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create-restaurant-menu',
    loadChildren: () => import('./pages/create-restaurant-menu/create-restaurant-menu.module').then( m => m.CreateRestaurantMenuPageModule)
  },
  {
    path: 'create-restaurant-menu/:restaurantId',
    loadChildren: () => import('./pages/create-restaurant-menu/create-restaurant-menu.module').then( m => m.CreateRestaurantMenuPageModule)
  },
  {
    path: 'create-restaurant-account',
    loadChildren: () => import('./pages/create-restaurant-account/create-restaurant-account.module').then( m => m.CreateRestaurantAccountPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'restaurant/:restaurantId/:tableId',
    loadChildren: () => import('./pages/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
