import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular'

import { FirebaseService } from 'src/app/services/firebase/firebase.service'
import { GenericToastService } from 'src/app/services/toasts/genericToast/generic-toast.service'
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

import { MenuItem } from 'src/app/models/menuItem';
import { Category } from 'src/app/models/category';
import { NumberValidator } from 'src/app/validators/number.validator';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss'],
})
export class AddItemModalComponent implements OnInit {

  @Input() category: Category;

  public itemNamePlaceholder: string = "Burger"
  public itemPricePlaceholder: string = "3.50"

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
      price: ['', Validators.compose([Validators.required, NumberValidator.isValid])]
    });
  }

  ngOnInit() {}

  async addMenuItem() {
    let description: string | null = this.itemForm.controls.description.value;
    let title: string = this.itemForm.controls.name.value;
    let price: string | null = this.itemForm.controls.price.value;
    let menuItem: MenuItem = {
      description: description,
      hasImage: this.image !== null,
      title: title,
      price: price,
    }
    if (this.itemForm.valid) {
      let newItem = await this.restaurantService.addMenuItem(this.category.id, menuItem);
      if (newItem != null) {
        menuItem.id = newItem.id

        this.firebaseService.uploadImage(newItem.id, "menuItems", this.image)
        .then(() => {
          this.category.menuItems[newItem.id] = menuItem;
        })

        this.dismissModal();
        this.toastService.presentToast("Success")
      } else {
        this.toastService.presentToast("Failure")
      }
    } else {
      this.toastService.presentToast("Please add valid values for all required fields")
    }
  }

  dismissModal() {
    this.modalController.dismiss()
  }

  setImage(image: any) {
    this.image = image
  }

}
