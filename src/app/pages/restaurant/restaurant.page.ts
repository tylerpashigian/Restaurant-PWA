import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu';
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
    this.restaurantService.initRestaurant(this.restaurantId);
    this.restuarantSubscription = this.restaurantService.restaurantPublish.subscribe((menu) => {
      this.menu = {...menu}
      console.log("Updated menu: ", this.menu);
    });
  }

  ngOnDestroy(): void {
    this.restuarantSubscription.unsubscribe();
  }

  addCartItem() {
    this.cartService.addItem({
      id: this.restaurantId,
      title: "Orange Chicken",
      price: "5.30"
    })
  }

  loadMenuItems(id: string) {
    if (this.menu.categories[id].menuItemMap) { 
      console.log('Gathered local items');
      console.log(this.menu.categories[id].menuItemMap);
    } else {
      this.restaurantService.subsribeToMenuItems(id)
      // .then((items) => { console.log(items); }); 
    }
  }

}
