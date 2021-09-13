import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export enum ToastType {
  success,
  failure,
}

@Injectable({
  providedIn: 'root',
})
export class GenericToastService {
  constructor(public toastController: ToastController) {}

  async presentToast(message: string, type: ToastType = null) {
    const toast = await this.toastController.create({
      color: this.getToastColor(type),
      duration: 2000,
      message: message,
    });
    toast.present();
  }

  private getToastColor(type: ToastType): string {
    switch (type) {
      case ToastType.success:
        return 'success';
      case ToastType.failure:
        return 'danger';
      default:
        return undefined;
    }
  }
}
