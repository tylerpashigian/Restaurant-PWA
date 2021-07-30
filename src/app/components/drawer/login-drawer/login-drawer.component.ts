import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DrawerService } from 'src/app/services/drawer/drawer.service';

@Component({
  selector: 'app-login-drawer',
  templateUrl: './login-drawer.component.html',
  styleUrls: ['./login-drawer.component.scss'],
})
export class LoginDrawerComponent implements OnInit {

  constructor(private authService: AuthService, private drawerService: DrawerService, private router: Router) {}

  ngOnInit() {}

  // TODO: move this to the user login flow, this was just a POC to test the Google SDK
  async loginAnonymously() {
    const user = await this.authService.loginAnonymously();
    if (user) {
      // TODO: find a way to make this generic enough to set a dynamic drawer type
      this.drawerService.setType(DrawerType.Cart);
      this.drawerService.setState(DrawerState.Preview);
    }
  }

  navigateToLogin() {
    this.drawerService.setState(DrawerState.Closed);
    this.router.navigate(['/login']);
  }

}
