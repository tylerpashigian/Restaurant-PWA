import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem';
import { CartService } from 'src/app/services/cart/cart.service';

type CartItem = { [key:string] : { items: MenuItem[], userAdded: string, quantity: number } };

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  data: any

  constructor(private cartService: CartService) { }

  cartItems: CartItem;

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.cartItemsUpdated.subscribe((cartItems: CartItem) => {      
      this.cartItems = cartItems;
    })
  }

}
