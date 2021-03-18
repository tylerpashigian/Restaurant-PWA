import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import 'firebase/firestore';
import { Subject } from 'rxjs';

import { Category } from 'src/app/models/category';
import { Menu } from 'src/app/models/menu';
import { MenuItem } from 'src/app/models/menuItem';

import { FirebaseService } from '../firebase/firebase.service'

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  menu: Menu;
  restaurantPublish = new Subject<Menu>();

  constructor(private firebaseService: FirebaseService) {}

  async initRestaurant(id: string) {
    let document = await this.firebaseService.database
    .collection("restaurants").doc(id)
    .get()    
    
    const data = document.data();

    this.getMenuCategories(document.id).then((menuCategories) => {
      this.menu = {
        id: document.id,
        categories: menuCategories,
        restaurantName: data.name
      }
      this.restaurantPublish.next(this.menu);
    })
  
  }

  async getCategories(): Promise<Category[]> {
    let documents = await this.firebaseService.database
    .collection("categories")
    .get()

    let categories = [] as Category[];
    documents.forEach(element => {
      let data = element.data()
      let category: Category = {
        title: data.category,
        startTime: data.startTime,
        endTime: data.endTime
      }
      categories.push(category);
    });
    return categories;

  }

  async getMenuCategories(id: string): Promise<{ [id: string]: Category }> {
    let documents = await this.firebaseService.database
    .collection("restaurants").doc(id).collection("categories")
    .get()

    let categories: { [id: string]: Category } = {};
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
            title: data.category,
            startTime: data.startTime,
            endTime: data.endTime,
            menuItems: items.length ? items : null
          }
          categories.push(category);
        });
      });
      handler(categories);
    })
  }

  subsribeToMenuItems(categoryId: string): Promise<MenuItem[]> {
    return new Promise((resolve, reject) => {
      let menuItems = [] as MenuItem[];
      this.firebaseService.database.collection("restaurants").doc(this.menu.id)
      .collection("menuItems").where("categoryId", "==", categoryId)
      .onSnapshot(documents => {
        console.log('menu item changed!');
        documents.forEach(async element => {
          let data = element.data()
          let menuItem: MenuItem = {
            id: element.id,
            description: data.description,
            title: data.name,
            price: data.price
          }
          menuItems.push(menuItem)
          if (!this.menu.categories[categoryId].menuItemMap) { this.menu.categories[categoryId].menuItemMap = {} }
          this.menu.categories[categoryId].menuItemMap[element.id] = menuItem;
        });
        this.restaurantPublish.next(this.menu);
        resolve(menuItems);
      })
    })
  }

  async getMenuItemsFromCategory(categoryId: string): Promise<MenuItem[]> {
    let menuItems = [] as MenuItem[];
    // TODO: convert this to onSnapshot to dynamically reload menuItem changes?
    let subcollections = await this.firebaseService.database.collection("categories").doc(categoryId).collection("menuItems").get()
    subcollections.forEach(element => {
      let data = element.data()
      // TODO: Decide if there's a better way to set an items id rather than rely on the Google generated element id
      let menuItem: MenuItem = {
        id: element.id,
        description: data.description,
        title: data.name,
        price: data.price
      }
      menuItems.push(menuItem)
    })
    return menuItems
  }

  async addCategory(category: Category): Promise<firebase.firestore.DocumentReference> {
    try {
      return await this.firebaseService.database.collection("categories").add({
        created: Date.now(),
        category: category.title,
        startTime: category.startTime,
        endTime: category.endTime
      });
    } catch(error) {
      console.log(`Error adding category ${error}`);
    }
  }

  async addMenuItem(categoryId: string, menuItem: MenuItem): Promise<firebase.firestore.DocumentReference> {
    try {
      return await this.firebaseService.database.collection("categories").doc(categoryId).collection("menuItems").add({
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
