import { Component, OnInit } from '@angular/core';
import { CartItems } from 'src/app/models/cartItems';
import { CartService } from 'src/app/services/cart/cart.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cartItems: CartItems;
  data: any;

  constructor(
    private cartService: CartService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.cartItemsUpdated.subscribe((cartItems: CartItems) => {            
      this.cartItems = cartItems;
    })
  }

  checkout() {
    this.restaurantService.checkout();
  }

}
