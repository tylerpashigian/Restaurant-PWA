import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular'

import { FirebaseService } from 'src/app/services/firebase/firebase.service'
import { GenericToastService } from 'src/app/services/toasts/genericToast/generic-toast.service'
import { RestaurantService } from 'src/app/services/database/restaurant/restaurant.service';

import { MenuItem } from 'src/app/models/menuItem';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss'],
})
export class AddItemModalComponent implements OnInit {

  @Input() category: Category;

  public itemNamePlaceholder: string = "Burger"
  public itemPricePlaceholder: string = "$3.50"

  public itemForm: FormGroup;

  public image?: any = null

  constructor(private firebaseService: FirebaseService, private formBuilder: FormBuilder, private modalController: ModalController, private restaurantService: RestaurantService, private toastService: GenericToastService) {
    this.createForms()
  }

  createForms() {
    // TODO: potentially add better form validation
    this.itemForm = this.formBuilder.group({
      description: [],
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async addMenuItem() {
    let description: string | null = this.itemForm.controls.description.value;
    let title: string = this.itemForm.controls.name.value;
    let price: string | null = this.itemForm.controls.price.value;
    let menuItem: MenuItem = {
      description: description,
      title: title,
      price: price,
    }
    let newItem = await this.restaurantService.addMenuItem(this.category.id, menuItem);
    if (newItem != null) {
      this.category.menuItems != null ? this.category.menuItems.push(menuItem) : this.category.menuItems = [menuItem];
      
      if (this.image) {
        this.firebaseService.storage.ref('menuItems').child(`${newItem.id}`).put(this.image)
      }

      this.dismissModal();
      this.toastService.presentToast("Success")
    } else {
      this.toastService.presentToast("Failure")
    }
  }

  dismissModal() {
    this.modalController.dismiss()
  }

  setImage(image: any) {
    this.image = image
  }

}
