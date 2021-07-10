import { Component, OnInit } from '@angular/core';
import { CartItems } from 'src/app/models/cartItems';
import { CartObject } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart/cart.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cartItems: CartItems;
  cartTotal: number;
  data: any;

  constructor(
    private cartService: CartService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.cartTotal = this.cartService.cartTotal;
    this.cartService.cartItemsUpdated.subscribe((cartItems: CartObject) => {            
      this.cartItems = cartItems.cartItems;
      this.cartTotal = cartItems.cartTotal;
    })
  }

  checkout() {
    this.restaurantService.checkout();
  }

}
