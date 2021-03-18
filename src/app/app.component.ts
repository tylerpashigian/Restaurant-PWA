import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
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
        // this.router.navigateByUrl('/create-restaurant-menu')
        this.router.navigateByUrl('/restaurant/HFpJCOq9mrCyvkak5fZa')
      } else {
        this.router.navigateByUrl('/login')
      }
    });
  }
}
