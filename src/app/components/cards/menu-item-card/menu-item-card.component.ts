import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss'],
})
export class MenuItemCardComponent implements OnInit {

  @Input() menuItem: MenuItem

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.loadImage()
  }

  loadImage() {
    this.firebaseService.storage.ref('menuItems').child(`${this.menuItem.id}`).getDownloadURL()
    .then((url) => {
      this.menuItem.imageUrl = url
    })
    .catch((error) => {
      // console.log(`Error getting menuItem id: ${error.code}`)
    })
  }

}
