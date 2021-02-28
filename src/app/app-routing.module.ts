import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create-restaurant-menu',
    loadChildren: () => import('./pages/create-restaurant-menu/create-restaurant-menu.module').then( m => m.CreateRestaurantMenuPageModule)
  },
  {
    path: 'create-restaurant-account',
    loadChildren: () => import('./pages/create-restaurant-account/create-restaurant-account.module').then( m => m.CreateRestaurantAccountPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'demo',
    loadChildren: () => import('./pages/demo/demo.module').then( m => m.DemoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
