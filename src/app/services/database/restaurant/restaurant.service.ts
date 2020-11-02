import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import 'firebase/firestore';

import { Category } from 'src/app/models/category';

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
      documents.forEach(element => {
        let data = element.data()
        let category: Category = {
          title: data.category,
          startTime: data.startTime,
          endTime: data.endTime
        }
        categories.push(category);
      });
      handler(categories);
    })
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

}
