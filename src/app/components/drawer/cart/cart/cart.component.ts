import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItems } from 'src/app/models/cartItems';
import { CartObject } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart/cart.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { DrawerService } from 'src/app/services/drawer/drawer.service';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItems;
  cartSubscription: Subscription;
  cartTotal: number;
  data: any;
  orderedItems: CartItems;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private drawerService: DrawerService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.cartTotal = this.cartService.cartTotal;
    this.orderedItems = this.cartService.orderedItems;
    this.cartSubscription = this.cartService.cartItemsUpdated.subscribe(
      (cartItems: CartObject) => {
        this.cartItems = cartItems.cartItems;
        this.cartTotal = cartItems.cartTotal;
        this.orderedItems = cartItems.orderedItems;
      }
    );
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  order() {
    if (this.authService.user) {
      this.cartService.order();
      // TODO: Find a better way to recalculate the size of an open drawer
      this.drawerService.setState(DrawerState.Open);
    } else {
      this.drawerService.setType(DrawerType.Login);
      this.drawerService.setState(DrawerState.Open);
    }
  }

  checkout() {
    this.restaurantService.checkout();
  }
}
