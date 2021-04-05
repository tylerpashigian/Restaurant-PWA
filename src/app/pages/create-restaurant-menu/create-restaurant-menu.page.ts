import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet, ModalController } from '@ionic/angular'

import { AuthService } from '../../services/auth/auth.service'
import { RestaurantService } from '../../services/restaurant/restaurant.service'

import { AddItemModalComponent } from 'src/app/components/modals/add-item-modal/add-item-modal.component';

import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-create-restaurant-menu',
  templateUrl: './create-restaurant-menu.page.html',
  styleUrls: ['./create-restaurant-menu.page.scss'],
})
export class CreateRestaurantMenuPage implements OnInit {

  public categoryForm: FormGroup;
  public restaurantName: string = "Sample Restaurant";
  public categoryPlaceholder: string = "Breakfast"
  public startTimePlaceholder: string = "8:00 am"
  public endTimePlaceholder: string = "12:00 pm"
  public categories: Category[];

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private modalController: ModalController, private restaurantService: RestaurantService, private routerOutlet: IonRouterOutlet) {
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
      endTime: endTime,
      startTime: startTime,
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
  // TODO check to see if this can be removed
  async getCategories() {
    await this.restaurantService.getCategories().then(data => {
      this.categories = data;
    })
  }

  // Subscribing to see live updates while editing
  subscribeToCategories() {
    this.restaurantService.subscribeToCategories(categories => {
      this.categories = categories;
    })
  }

  async presentModal(category: Category) {
    const modal = await this.modalController.create({
      component: AddItemModalComponent,
      componentProps: {
        'category': category
      },
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true
    });
    return await modal.present();
  }

}
