import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular'

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

  private itemForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private restaurantService: RestaurantService) {
    this.createForms()
  }

  createForms() {
    // TODO: potentially add better form validation
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async addMenuItem() {
    let title: string = this.itemForm.controls.name.value;
    let price: string | null = this.itemForm.controls.price.value;
    let menuItem: MenuItem = {
      title: title,
      price: price,
    }
    let newItem = await this.restaurantService.addMenuItem(this.category.id, menuItem);
  }

  dismissModal() {
    this.modalController.dismiss()
  }

}
