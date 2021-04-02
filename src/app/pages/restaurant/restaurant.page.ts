import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'src/app/models/menuItem';
import { CartService } from 'src/app/services/cart/cart.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnDestroy, OnInit {

  menu: Menu;
  restaurantId: string;
  restuarantSubscription: Subscription;
  tableId: string;

  constructor(
    private cartService: CartService,
    private restaurantService: RestaurantService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restaurantId = this.route.params['restaurantId'];
    this.route.params.subscribe((params: Params) => {
      this.restaurantId = params['restaurantId'];
    });
    this.tableId = this.route.params['tableId'];
    this.route.params.subscribe((params: Params) => {
      this.tableId = params['tableId'];
    });
    this.restaurantService.initRestaurant(this.restaurantId, this.tableId);
    this.restuarantSubscription = this.restaurantService.restaurantPublish.subscribe((menu) => {
      this.menu = {...menu}
    });
  }

  ngOnDestroy(): void {
    this.restuarantSubscription.unsubscribe();
  }

  addCartItem(menuItem: MenuItem) {    
    this.cartService.addItem({
      id: menuItem.id,
      title: menuItem.title,
      price: menuItem.price
    })
  }

  loadMenuItems(id: string) {
    if (this.menu.categories[id].menuItemMap) { 
      console.log('Gathered local items', this.menu.categories[id].menuItemMap);
    } else {
      this.restaurantService.subsribeToMenuItems(id)
      // .then((items) => { console.log(items); }); 
    }
  }

}
