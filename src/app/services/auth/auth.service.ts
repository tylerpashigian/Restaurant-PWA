import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as firebase from "firebase/app";
import "firebase/auth"

import { FirebaseService } from '../firebase/firebase.service'
import { GenericToastService, ToastType } from '../../services/toasts/genericToast/generic-toast.service'
import { environment } from 'src/environments/environment';
import { Constants } from 'src/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: firebase.User;

  constructor(private firebaseService: FirebaseService, private toastService: GenericToastService, private storage: Storage) {
    this.init()
  }

  init() {
    if (environment.mock) {
      firebase.auth().useEmulator(Constants.Mock.MockFirebaseAuthURL);
    }

    firebase.auth().onAuthStateChanged(user => {
      this.user = user;

      this.storage.ready().then(() => {
        const uid = this.user ? this.user.uid : null;
        this.storage.set("user", uid);
      });

    })
  }

  async loginAnonymously(): Promise<firebase.auth.UserCredential> {
    try {
      const user = await firebase.auth().signInAnonymously();
      this.toastService.presentToast("Success", ToastType.success)
      return user
    } catch(error) {
      console.log(error)
      this.toastService.presentToast("Failure", ToastType.failure)
    }
  }

  async loginWithEmail(email: string, password: string) {
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.toastService.presentToast("Success", ToastType.success)
      return user
    } catch(error) {
      console.log(error)
      this.toastService.presentToast("Failure", ToastType.failure)
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
      this.toastService.presentToast("Success", ToastType.success)
      return user
    } catch(error) {
      console.log(error)
      this.toastService.presentToast("Failure", ToastType.failure)
    }
  }

}
