import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import 'firebase/firestore';

import { Category } from 'src/app/models/category';
import { MenuItem } from 'src/app/models/menuItem';

import { FirebaseService } from '../../firebase/firebase.service'

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private firebaseService: FirebaseService) {}

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

  subscribeToCategories(handler: Function): void {
    this.firebaseService.database
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
    let subcollections = await this.firebaseService.database.collection("categories").doc(categoryId).collection("menuItems").get()
    subcollections.forEach(element => {
      let data = element.data()
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
