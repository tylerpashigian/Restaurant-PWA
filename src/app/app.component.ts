import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { CartService } from './services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  get drawerState() { return this.cart.drawerState }

  constructor(
    private cart: CartService,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setRoot();
    });
  }

  setRoot() {
    this.storage.get("user").then((user) => {
      if (user) {
        this.router.navigateByUrl('/create-restaurant-menu')
      } else {
        this.router.navigateByUrl('/home')
      }
    });
  }
}
