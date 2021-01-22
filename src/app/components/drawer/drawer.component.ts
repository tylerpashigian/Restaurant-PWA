import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
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

  // @HostListener('window:orientationchange', ['$event'])
  // onOrientationChange(event) {
  //   this.platform.ready().then(() => {
  //     if (this.platform.isLandscape()) {
  //       console.log(`Orientation changed to portrait`)
  //       this.drawerHeight = this.screenHeight
  //     } else {
  //       console.log(`Orientation changed to landscape`)
  //       this.drawerHeight = this.screenWidth
  //     }
  //   })
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.platform.ready().then(() => {
      if (this.platform.isPortrait()) {
        this.drawerHeight = this.screenHeight;
      } else {
        this.drawerHeight = this.screenWidth;
      }
      // this.drawerHeight = this.platform.height();
      // console.log(`Drawer Height: ${this.platform.height()}`);
      this.setDrawerState(this.cartService.drawerState, false);
    })
  }

  isOpen: boolean = false;
  drawerHeight: number = this.platform.height();
  previewHeight: number;
  deltaY: number = 0
  screenHeight: number;
  screenWidth: number;

  @Input()
  set drawerState(state: DrawerState) {
    this.setDrawerState(state, true)
  }

  constructor(private cartService: CartService, private gestureController: GestureController, private platform: Platform) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.setScreenDimmensions();
    })
  }

  ngAfterViewInit() {
    this.initGesture();
    this.previewHeight = this.previewWrapper.nativeElement.offsetHeight;
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

  setScreenDimmensions() {
    if (this.platform.isPortrait()) {
      this.screenHeight = this.platform.height()
      this.screenWidth = this.platform.width()
    } else {
      this.screenWidth = this.platform.height()
      this.screenHeight = this.platform.width()
    }
  }

  toggleDrawer() {
    if (this.cartService.drawerState == DrawerState.Open) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  setDrawerState(state: DrawerState, animate: boolean) {
    const drawer = this.drawer.nativeElement;
    drawer.style.transition = animate ? '.4s ease-out' : '';
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
    this.isOpen = false;
    try {this.previewHeight = this.previewWrapper.nativeElement.offsetHeight;} catch {}
    drawer.style.top = `calc(${this.drawerHeight - this.previewHeight}px - env(safe-area-inset-bottom))`;
    this.cartService.drawerState = DrawerState.Preview
  }

  openDrawer() {
    const drawer = this.drawer.nativeElement;
    drawer.style.top = `${this.drawerHeight*.05}px`;
    this.isOpen = true;
    this.cartService.drawerState = DrawerState.Open
  }

  closeDrawer() {
    const drawer = this.drawer.nativeElement;
    drawer.style.top = `${this.drawerHeight + 10}px`
    this.isOpen = false;
    this.cartService.drawerState = DrawerState.Closed
  }

}
