import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as hash from 'hash.js'

import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  public loginForm: FormGroup;
  public emailPlaceholder: string = "email";
  public passwordPlaceholder: string = "password"

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.createForms()
  }

  createForms() {
    // TODO: potentially add better form validation
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // TODO: move this to the user login flow, this was just a POC to test the Google SDK
  async loginAnonymously() {
    const user = await this.authService.loginAnonymously();
    if (user) { this.router.navigate(['/home']); }
  }

  async loginWithEmail() {
    const hashedPassword = hash.sha256().update(this.loginForm.controls.password.value).digest('hex');
    const user = await this.authService.loginWithEmail(this.loginForm.controls.email.value, hashedPassword);
    if (user) { this.router.navigate(['/home']); }
  }

}
