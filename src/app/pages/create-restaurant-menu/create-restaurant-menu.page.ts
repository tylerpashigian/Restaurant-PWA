import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

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

  categories: Category[];
  categoryForm: FormGroup;
  categoryPlaceholder: string = "Breakfast"
  endTimePlaceholder: string = "12:00 pm"
  restaurantId: string;
  restaurantName: string = "Sample Restaurant";
  startTimePlaceholder: string = "8:00 am"

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private modalController: ModalController, 
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private routerOutlet: IonRouterOutlet
  ) {
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
    this.route.params.subscribe((params: Params) => {
      this.restaurantId = params['restaurantId'];
    });
    this.restaurantService.initRestaurant(this.restaurantId, null);
    this.subscribeToCategories();
  }

  // Loading data once while reading as a customer
  // TODO check to see if this can be removed
  async getCategories() {
    await this.restaurantService.getCategories(this.restaurantId).then(data => {
      this.categories = data;
    })
  }

  // Subscribing to see live updates while editing
  subscribeToCategories() {
    this.restaurantService.subscribeToCategories((categories: Category[]) => {
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
