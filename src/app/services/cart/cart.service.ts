import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CartItems } from 'src/app/models/cartItems';
import { CartObject } from 'src/app/models/cart';
import { DrawerService } from '../drawer/drawer.service';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';
import { MenuItem } from 'src/app/models/menuItem';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  cartSubscription: Subscription;
  cartItemsUpdated = new Subject<CartObject>();
  cartItems: CartItems = {};
  cartTotal: number;
  orderedItems: CartItems = {};

  constructor(
    private drawerService: DrawerService,
    private restaurantService: RestaurantService
  ) {
    this.initCartSubscription();
  }

  initCartSubscription(): void {
    this.cartSubscription = this.restaurantService.cartPublish.subscribe(
      (cart) => {
        this.cartItems = this.createItemsObject(cart.cartItems);
        this.orderedItems = this.createItemsObject(cart.orderedItems);
        this.cartTotal = cart.cartTotal;
        this.setDrawerState(cart.cartItems, cart.orderedItems);
        this.cartItemsUpdated.next({
          cartItems: this.cartItems,
          cartTotal: cart.cartTotal,
          orderedItems: this.orderedItems,
        });
      }
    );
  }

  createItemsObject(itemsList: MenuItem[]): any {
    return itemsList.reduce((items, next) => {
      if (items[next.userAdded]) {
        items[next.userAdded].items.push(next);
        items[next.userAdded].quantity += 1;
      } else {
        items[next.userAdded] = {
          items: [next],
          quantity: 1,
          userAdded: next.userAdded,
          userEmail: next.userEmail,
        };
      }
      return items;
    }, {});
  }

  // REVIEW Should this be skipped and restaurantService be called directly?
  addItem(item: MenuItem) {
    this.restaurantService.addCartItem(item);
  }

  order(): void {
    // TODO: make executeOrder return a promise to only alter cartItemsUpdated if successful
    this.restaurantService.executeOrder(this.cartItems, this.orderedItems);
    this.orderedItems = this.cartItems;
    this.cartItems = {};
    this.cartItemsUpdated.next({
      cartItems: this.cartItems,
      cartTotal: this.cartTotal,
      orderedItems: this.orderedItems,
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  setDrawerState(cart: MenuItem[], orderedItems: MenuItem[]): void {
    if (
      (cart.length || orderedItems.length) &&
      this.drawerService.drawerState === DrawerState.Closed
    ) {
      this.drawerService.setType(DrawerType.Cart);
      this.drawerService.setState(DrawerState.Preview);
    } else if (!cart.length && !orderedItems.length) {
      this.drawerService.setState(DrawerState.Closed);
    }
  }
}
