import { Component, OnInit, Input } from '@angular/core';

import { AddItemModalComponent } from 'src/app/components/modals/add-item-modal/add-item-modal.component';
import { IonRouterOutlet, ModalController } from '@ionic/angular'
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss'],
})
export class MenuItemCardComponent implements OnInit {

  @Input() cardModel: Category;

  constructor(private modalController: ModalController, private routerOutlet: IonRouterOutlet) {}

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddItemModalComponent,
      componentProps: {
        'category': this.cardModel
      },
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true
    });
    return await modal.present();
  }

}
