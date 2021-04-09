import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import 'firebase/firestore';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Categories, Category } from 'src/app/models/category';
import { Menu } from 'src/app/models/menu';
import { MenuItem, MenuItems } from 'src/app/models/menuItem';
import { AuthService } from '../auth/auth.service';

import { FirebaseService } from '../firebase/firebase.service'
import { GenericToastService } from '../toasts/genericToast/generic-toast.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  menu: Menu;
  restaurantId: string;
  restaurantPublish = new Subject<Menu>();
  tableId: string;
  cartPublish = new Subject<MenuItem[]>();

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private toastService: GenericToastService
  ) {}

  async initRestaurant(restaurantId: string, tableId: string) {
    this.restaurantId = restaurantId;
    this.tableId = tableId;
    let document = await this.firebaseService.database
    .collection("restaurants").doc(restaurantId)
    .get()    
    
    const data = document.data();

    this.getMenuCategories(document.id).then((menuCategories) => {
      try {
        this.menu = {
          id: document.id,
          categories: menuCategories,
          restaurantName: data.name
        }
        this.restaurantPublish.next(this.menu);
        this.subsribeToCart();
      } catch(error) {
        this.toastService.presentToast("Invalid Restaurant Id");
      }
    }); 
  }

  // ANCHOR Cart Related Functions
  subsribeToCart(): void {
    this.firebaseService.database
      .collection("tables").doc(`${this.restaurantId}#${this.tableId}`)
      .onSnapshot(document => {
        let cartItems = [] as MenuItem[];
        const items = document.data().items ?? [];
        items.forEach(item => {
          cartItems.push({ id: item.id, title: item.title, price: item.price } as MenuItem)
        });        
        this.cartPublish.next(cartItems);
      })
  }

  addCartItem(item: MenuItem) {
    const data = {
      id: item.id,
      // description: item.description,
      title: item.title,
      price: item.price ?? '',
      userAdded: this.authService.user.uid,
      uuid: uuidv4(),
      // imageUrl?: string;
      // ingredients: [string];
      // created: Date.now(),
    };
    
    this.firebaseService.database
      .collection("tables")
      .doc(`${this.restaurantId}#${this.tableId}`)
      .update({
        items: firebase.firestore.FieldValue.arrayUnion(data)
      })
      .catch((error) => {
        console.log(`Firebase error: ${error}`);   
      });
  }


  checkout(): void {
    // TODO: handle payment logic here as well and only clearTable if the payment was successful
    this.clearTable();
  }

  clearTable(): void {
    this.firebaseService.database
      .collection("tables")
      .doc(`${this.restaurantId}#${this.tableId}`)
      .update({
        items: firebase.firestore.FieldValue.delete()
      })
  }

  // ANCHOR Category Related Functions
  async getCategories(id: string): Promise<Category[]> {
    let documents = await this.firebaseService.database
    .collection("restaurants").doc(id).collection("categories")
    .get()

    let categories = [] as Category[];
    documents.forEach(element => {
      let data = element.data();
      let category: Category = {
        title: data.name,
        startTime: data.startTime,
        endTime: data.endTime
      }
      categories.push(category);
    });
    return categories;

  }

  async getMenuCategories(id: string): Promise<Categories> {
    let documents = await this.firebaseService.database
    .collection("restaurants").doc(id).collection("categories")
    .get()

    let categories: Categories = {};
    documents.forEach(element => {
      let data = element.data()
      let category: Category = {
        id: element.id,
        title: data.name,
        startTime: data.startTime,
        endTime: data.endTime,
      }
      categories[element.id] = category
    });
    return categories;
  }

  subscribeToCategories(handler: Function): void {
    this.firebaseService.database
    .collection("restaurants").doc(this.restaurantId)
    .collection("categories")
    .onSnapshot(documents => {
      console.log('Category changed!');
      let categories = [] as Category[];
      documents.forEach(async element => {
        let data = element.data()
        // DO NOT force all items to load every time a category is loaded, maybe add "see all"
        // Maybe save 3 menu items as snippet from each category as a "preview" in category object
        await this.getMenuItemsFromCategory(element.id).then(items => {
          let category: Category = {
            id: element.id,
            title: data.name,
            startTime: data.startTime,
            endTime: data.endTime,
            menuItems: items
          }
          categories.push(category);
        });
      });
      handler(categories);
    })
  }

  async addCategory(category: Category): Promise<firebase.firestore.DocumentReference> {
    try {
      return await this.firebaseService.database.collection("restaurants").doc(this.restaurantId).collection("categories").add({
        created: Date.now(),
        name: category.title,
        startTime: category.startTime,
        endTime: category.endTime
      });
    } catch(error) {
      console.log(`Error adding category ${error}`);
    }
  }

  // ANCHOR MenuItem Related Functions
  subsribeToMenuItems(categoryId: string): void {
    let menuItems = [] as MenuItem[];
    this.firebaseService.database.collection("restaurants").doc(this.menu.id)
    .collection("menuItems").where("categoryId", "==", categoryId)
    .onSnapshot(documents => {
      console.log('menu item changed!');
      documents.forEach(element => {
        let data = element.data()
        let menuItem: MenuItem = {
          id: element.id,
          description: data.description,
          title: data.name,
          price: data.price
        }
        menuItems.push(menuItem)
        if (!this.menu.categories[categoryId].menuItems) { this.menu.categories[categoryId].menuItems = {} }
        this.menu.categories[categoryId].menuItems[element.id] = menuItem;
      });
      this.restaurantPublish.next(this.menu);
    })
  }

  async getMenuItemsFromCategory(categoryId: string): Promise<MenuItems> {
    let menuItems = {} as MenuItems;
    // TODO: convert this to onSnapshot to dynamically reload menuItem changes?
    let subcollections = await this.firebaseService.database
    .collection("restaurants").doc(this.restaurantId)
    .collection("menuItems").where("categoryId", "==", categoryId).get()
    subcollections.forEach(element => {
      let data = element.data()
      // TODO: Decide if there's a better way to set an items id rather than rely on the Google generated element id
      let menuItem: MenuItem = {
        id: element.id,
        description: data.description,
        title: data.name,
        price: data.price
      }
      menuItems[element.id] = menuItem;
    })
    return menuItems
  }

  async addMenuItem(categoryId: string, menuItem: MenuItem): Promise<firebase.firestore.DocumentReference> {
    try {
      return await this.firebaseService.database
      .collection("restaurants").doc(this.restaurantId)
      .collection("menuItems").add({
        categoryId: categoryId,
        created: Date.now(),
        description: menuItem.description,
        name: menuItem.title,
        price: menuItem.price
      });
    } catch(error) {
      console.log(`Error adding category ${error}`);
    }
  }

}
