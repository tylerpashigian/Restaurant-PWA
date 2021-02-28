import { Injectable } from '@angular/core';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  public drawerState: DrawerState = DrawerState.Closed
  public drawerType: DrawerType = DrawerType.Cart

  constructor() { }
}
