import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CartItems } from 'src/app/models/cartItems';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';
import { MenuItem } from 'src/app/models/menuItem';
import { DrawerService } from '../drawer/drawer.service';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  cartSubscription: Subscription;
  cartItemsUpdated = new Subject<CartItems>();
  cartItems: CartItems = {};

  constructor(
    private drawerService: DrawerService, 
    private restaurantService: RestaurantService
  ) {
    this.initCartSubscription();
  }

  initCartSubscription(): void {
    this.cartSubscription = this.restaurantService.cartPublish.subscribe((cart) => {
      this.setDrawerState(cart);
      const cartObject = cart.reduce((items, next) => {
        if (items[next.id]) {
          items[next.id].items.push(next)
          items[next.id].quantity += 1;
        } else {
          items[next.id] = { items: [next], quantity: 1 }
        }        
        return items;
      }, {});
      this.cartItems = cartObject
      this.cartItemsUpdated.next(cartObject);
    });
  }
  
  // REVIEW Should this be skipped and restaurantService be called directly?
  addItem(item: MenuItem) {
    this.restaurantService.addCartItem(item);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  setDrawerState(cart: MenuItem[]): void {
    if (cart.length && this.drawerService.drawerState === DrawerState.Closed) {
      this.drawerService.setType(DrawerType.Cart);
      this.drawerService.setState(DrawerState.Preview);
    } else if (!cart.length) {
      this.drawerService.setState(DrawerState.Closed);
    }
  }
  
}
