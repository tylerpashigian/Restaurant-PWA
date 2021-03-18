import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';
import { MenuItem } from 'src/app/models/menuItem';
import { AuthService } from '../auth/auth.service';
import { DrawerService } from '../drawer/drawer.service';

type CartItem = { [key:string] : { items: MenuItem[], userAdded: string, quantity: number } };

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemsUpdated = new Subject<CartItem>();

  constructor(private authService: AuthService, private drawerService: DrawerService) { }

  cartItems: CartItem = {};

  addItem(item: MenuItem) {
    if (this.cartItems[item.id]) {
      this.cartItems[item.id].items.push(item)
      this.cartItems[item.id].quantity += 1;
    } else {
      this.cartItems[item.id] = { items: [item], userAdded: "georihgoriu", quantity: 1 }
    }

    this.drawerService.setType(DrawerType.Cart);
    this.drawerService.setState(DrawerState.Preview);
    
    this.cartItemsUpdated.next(this.cartItems);
    
  }
  
}
