import { EventEmitter, Injectable } from '@angular/core';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  drawerStateChanged = new EventEmitter<DrawerState>();
  drawerTypeChanged = new EventEmitter<DrawerType>();

  public drawerState: DrawerState = DrawerState.Closed
  public drawerType: DrawerType = DrawerType.Cart

  constructor() { }

  setType(type: DrawerType) {
    this.drawerType = type;
    this.drawerTypeChanged.emit(type);
  }

  setState(state: DrawerState) {
    this.drawerState = state;
    this.drawerStateChanged.emit(state);
  }

}
