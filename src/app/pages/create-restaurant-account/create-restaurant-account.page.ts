import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as hash from 'hash.js'

import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-create-restaurant-account',
  templateUrl: './create-restaurant-account.page.html',
  styleUrls: ['./create-restaurant-account.page.scss'],
})
export class CreateRestaurantAccountPage implements OnInit {

  private createForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.createForms()
  }

  createForms() {
    // TODO: potentially add better form validation
    this.createForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async createAccount() {
    const hashedPassword = hash.sha256().update(this.createForm.controls.password.value).digest('hex')
    const user = await this.authService.createAccount(this.createForm.controls.email.value, hashedPassword);
    if (user) { this.router.navigate(['/create-restaurant-menu']) }
  }

  ngOnInit() {}

}
