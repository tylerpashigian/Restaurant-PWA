import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service'
import { RestaurantService } from '../../services/database/restaurant/restaurant.service'

import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-create-restaurant-menu',
  templateUrl: './create-restaurant-menu.page.html',
  styleUrls: ['./create-restaurant-menu.page.scss'],
})
export class CreateRestaurantMenuPage implements OnInit {

  private categoryForm: FormGroup;
  private restaurantName: string = "Sample Restaurant";
  private categoryPlaceholder: string = "Breakfast"
  private startTimePlaceholder: string = "8:00 am"
  private endTimePlaceholder: string = "12:00 pm"
  private categories: Category[];

  constructor(private authService: AuthService, private restaurantService: RestaurantService, private formBuilder: FormBuilder) {
    this.createForms()
  }

  createForms() {
    // TODO: potentially add better form validation
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
      startTime: [''],
      endTime: ['']
    });
  }

  async addCategory() {
    let title: string = this.categoryForm.controls.category.value;
    let startTime: string | null = this.categoryForm.controls.startTime.value;
    let endTime: string | null = this.categoryForm.controls.endTime.value;
    let category: Category = {
      title: title,
      startTime: startTime,
      endTime: endTime
    }
    let newCategory = await this.restaurantService.addCategory(category);
  }

  async logout() {
    await this.authService.logout();
  }

  ngOnInit() {
    this.subscribeToCategories();
  }

  // Loading data once while reading as a customer
  async getCategories() {
    await this.restaurantService.getCategories().then(data => {
      this.categories = data;
    })
  }

  // Subscribing to see live updates while editing
  subscribeToCategories() {
    this.restaurantService.subscribeToCategories(categories => {
      this.categories = categories
    })
  }

}
