import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import 'firebase/firestore';

import { Category } from 'src/app/models/category';
import { MenuItem } from 'src/app/models/menuItem';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private database: firebase.firestore.Firestore;

  constructor() {
    this.database = firebase.firestore();
  }

  async getCategories(): Promise<Category[]> {
    let documents = await this.database
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

  subscribeToCategories(handler: Function): void {
    this.database
    .collection("categories")
    .onSnapshot(documents => {
      let categories = [] as Category[];
      documents.forEach(async element => {
        let data = element.data()
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

  async getMenuItemsFromCategory(categoryId: string): Promise<MenuItem[]> {
    let menuItems = [] as MenuItem[];
    // TODO: change to onSnapshot
    let subcollections = await this.database.collection("categories").doc(categoryId).collection("menuItems").get()
    subcollections.forEach(element => {
      let data = element.data()
      let menuItem: MenuItem = {
        title: data.name,
        price: data.price
      }
      menuItems.push(menuItem)
    })
    return menuItems
  }

  async addCategory(category: Category): Promise<firebase.firestore.DocumentReference> {
    try {
      return await this.database.collection("categories").add({
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
      return await this.database.collection("categories").doc(categoryId).collection("menuItems").add({
        created: Date.now(),
        name: menuItem.title,
        price: menuItem.price
      });
    } catch(error) {
      console.log(`Error adding category ${error}`);
    }
  }

}
