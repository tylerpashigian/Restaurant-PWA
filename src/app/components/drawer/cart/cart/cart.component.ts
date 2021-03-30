import { Component, OnInit } from '@angular/core';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';
import { MenuItem } from 'src/app/models/menuItem';
import { CartService } from 'src/app/services/cart/cart.service';
import { DrawerService } from 'src/app/services/drawer/drawer.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

type CartItem = { [key:string] : { items: MenuItem[], userAdded: string, quantity: number } };

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cartItems: CartItem;
  data: any;

  constructor(
    private cartService: CartService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.cartItemsUpdated.subscribe((cartItems: any) => {            
      console.log('Updated cart items: ', cartItems);
      this.cartItems = cartItems;
    })
  }

  checkout() {
    this.restaurantService.checkout();
  }

}
