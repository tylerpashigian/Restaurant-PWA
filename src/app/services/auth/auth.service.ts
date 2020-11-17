import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import "firebase/auth"

import { GenericToastService } from '../../services/toasts/genericToast/generic-toast.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: firebase.User;

  constructor(private toastService: GenericToastService) {
    this.init()
  }

  init() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    })
  }

  async loginAnonymously(): Promise<firebase.auth.UserCredential> {
    try {
      const user = await firebase.auth().signInAnonymously();
      this.toastService.presentToast("Success")
      return user
    } catch(error) {
      console.log(error)
      this.toastService.presentToast("Failure")
    }
  }

  async loginWithEmail(email: string, password: string) {
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.toastService.presentToast("Success")
      return user
    } catch(error) {
      console.log(error)
      this.toastService.presentToast("Failure")
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();
      this.toastService.presentToast("Success");
    } catch (error) {
      console.log(error);
      this.toastService.presentToast("Failure");
    }
  }

  async createAccount(email: string, password: string) {
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.toastService.presentToast("Success")
      return user
    } catch(error) {
      console.log(error)
      this.toastService.presentToast("Failure")
    }
  }

}
