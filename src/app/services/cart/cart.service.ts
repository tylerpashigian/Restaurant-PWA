import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';
import { MenuItem } from 'src/app/models/menuItem';
import { DrawerService } from '../drawer/drawer.service';
import { RestaurantService } from '../restaurant/restaurant.service';

type CartItem = { [key:string] : { items: MenuItem[], userAdded: string, quantity: number } };

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartSubscription: Subscription;
  cartItemsUpdated = new Subject<CartItem>();
  cartItems: CartItem = {};

  constructor(private drawerService: DrawerService, private restaurantService: RestaurantService) {
    // Why is this not working in ngOnInit
    console.log('Cart service init');
    this.cartSubscription = this.restaurantService.cartPublish.subscribe((cart) => {
      if (cart.length && this.drawerService.drawerState === DrawerState.Closed) {
        this.drawerService.setType(DrawerType.Cart);
        this.drawerService.setState(DrawerState.Preview);
      } else if (!cart.length) {
        this.drawerService.setState(DrawerState.Closed);
      }
      const cartObject = cart.reduce((items, next) => {
        if (items[next.id]) {
          items[next.id].items.push(next)
          items[next.id].quantity += 1;
        } else {
          items[next.id] = { items: [next], userAdded: "georihgoriu", quantity: 1 }
        }        
        return items;
      }, {});
      console.log('cart subscription updated', cartObject);
      this.cartItems = cartObject
      this.cartItemsUpdated.next(cartObject);
    });
  }

  addItem(item: MenuItem) {
    this.restaurantService.addCartItem(item);
  }
  
}
