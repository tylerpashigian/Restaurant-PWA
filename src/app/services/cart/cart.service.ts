import { Injectable } from '@angular/core';
import { DrawerState } from 'src/app/models/drawerState';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public drawerState: DrawerState

  constructor() { }
}
