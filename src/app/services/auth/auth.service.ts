import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";
import "firebase/auth"

import { Constants } from '../../../utils/constants';
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
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: Constants.Firebase.FirebaseApiKey,
      authDomain: Constants.Firebase.FirebaseAuthDomain,
      databaseURL: Constants.Firebase.FirebaseDatabaseURL,
      projectId: Constants.Firebase.FirebaseProjectId,
      storageBucket: Constants.Firebase.FirebaseStorageBucket,
      messagingSenderId: Constants.Firebase.FirebaseMessagingSenderId,
      appId: Constants.Firebase.FirebaseAppId,
      measurementId: Constants.Firebase.FirebaseMeasurementId
    };


    if (!firebase.apps.length) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      // firebase.analytics();
    }

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
