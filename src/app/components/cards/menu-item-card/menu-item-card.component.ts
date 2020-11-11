import { Component, OnInit, Input } from '@angular/core';

import { AddItemModalComponent } from 'src/app/components/modals/add-item-modal/add-item-modal.component';
import { ModalController } from '@ionic/angular'
import { MenuItem } from 'src/app/models/menuItem';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss'],
})
export class MenuItemCardComponent implements OnInit {

  private currentModal = null

  @Input() cardModel: MenuItem[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddItemModalComponent,
      componentProps: {
        'category': this.cardModel
      },
      swipeToClose: true
    });
    this.currentModal = modal;
    return await modal.present();
  }

}
