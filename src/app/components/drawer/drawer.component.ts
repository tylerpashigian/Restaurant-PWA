import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';
import { DrawerState } from 'src/app/models/drawerState';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @ViewChild('previewWrapper', { read: ElementRef }) previewWrapper: ElementRef;

  isOpen: boolean = false;
  drawerHeight: number = (this.platform.height());
  deltaY: number = 0

  @Input()
  set drawerState(state: DrawerState) {
    this.setDrawerState(state)
  }

  constructor(private cartService: CartService, private gestureController: GestureController, private platform: Platform) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initGesture();
  }

  initGesture() {
    const drawer = this.drawer.nativeElement;
    const swipeGesture = this.gestureController.create({
      el: drawer,
      gestureName: "swipe",
      direction: "y",
      onMove: ev => this.moveEvent(ev),
      onEnd: ev => this.endEvent(ev)
    });
    swipeGesture.enable(true);
  }

  moveEvent(ev) {
    const drawer = this.drawer.nativeElement;
    const y = this.deltaY + ev.deltaY;
    if (y < -this.drawerHeight * .9) return;
    if (y > 0) return;
    // drawer.style.transform = `translateY(${y}px)`;
  }

  endEvent(ev) {
    this.deltaY = this.deltaY + ev.deltaY;
  }

  toggleDrawer() {
    if (this.isOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  setDrawerState(state: DrawerState) {
    switch (state) {
      case 0:
        this.closeDrawer();
        break;
      case 1:
        this.openDrawer();
        break;
      case 2:
        this.openPreview();
        break;
      default:
        break;
    }
  }

  openPreview() {
    const drawer = this.drawer.nativeElement;
    drawer.style.transition = '.4s ease-out';
    drawer.style.top = `calc(${this.drawerHeight - this.previewWrapper.nativeElement.offsetHeight}px - env(safe-area-inset-bottom)`;
    this.cartService.drawerState = DrawerState.Preview
  }

  openDrawer() {
    const drawer = this.drawer.nativeElement;
    drawer.style.transition = '.4s ease-out';
    drawer.style.top = `calc(${this.drawerHeight*.1}px`;
    this.isOpen = true;
    this.cartService.drawerState = DrawerState.Open
  }

  closeDrawer() {
    const drawer = this.drawer.nativeElement;
    drawer.style.transition = '.4s ease-out';
    drawer.style.top = `${this.drawerHeight}px`
    this.isOpen = false;
    this.cartService.drawerState = DrawerState.Closed
  }

}
