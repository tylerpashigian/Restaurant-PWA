import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'src/app/models/menuItem';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { DrawerService } from 'src/app/services/drawer/drawer.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnDestroy, OnInit {

  drawerHeight: number = 0;
  drawerHeightSubscription: Subscription;
  menu: Menu;
  restaurantId: string;
  restuarantSubscription: Subscription;
  tableId: string;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private drawerService: DrawerService,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    this.tableId = this.route.snapshot.paramMap.get('tableId');
    this.restaurantService.initRestaurant(this.restaurantId, this.tableId);
    this.restuarantSubscription = this.restaurantService.restaurantPublish.subscribe((menu) => {
      this.menu = { ...menu };
    });
    this.drawerHeightSubscription = this.drawerService.drawerHeightChanged.subscribe((height: number) => {
      this.drawerHeight = height;
    });
  }

  ngOnDestroy(): void {
    this.drawerHeightSubscription.unsubscribe();
    this.restuarantSubscription.unsubscribe();
  }

  addCartItem(menuItem: MenuItem) {
    if (this.authService.user) {
      this.cartService.addItem({
        id: menuItem.id,
        title: menuItem.title,
        price: menuItem.price,
      });
      if (this.drawerService.drawerState === DrawerState.Open) {
        this.drawerService.setState(DrawerState.Open);
      }
    } else {
      this.drawerService.setType(DrawerType.Login);
      this.drawerService.setState(DrawerState.Open);
    }
  }

  loadMenuItems(id: string) {
    // TODO: Move this logic to a back end store
    if (this.menu.categories[id].menuItems) {
      console.log('Gathered local items', this.menu.categories[id].menuItems);
    } else {
      this.restaurantService.subsribeToMenuItems(id);
      // .then((items) => { console.log(items); });
    }
  }

}
