import { Component, ComponentFactoryResolver, OnInit, AfterViewInit, ViewChild, ElementRef, Input, HostListener, Type, NgZone } from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';
import { DrawerDirective } from './drawer.directive';
import { DrawerService } from 'src/app/services/drawer/drawer.service';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';
import { DemoComponent } from '../demo/demo.component';
import { CartComponent } from './cart/cart/cart.component';
import { DrawerPreviewDirective } from './drawer-preview.directive';
import { CartPreviewComponent } from './cart/cart-preview/cart-preview.component';

export class AdItem {
  constructor(public component: Type<any>, public data: any, public openPreview: () => void = () => {}) {}
}

export interface AdComponent {
  data: any;
  openDrawerCallback?: () => void
}

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @ViewChild('previewWrapper', { read: ElementRef }) previewWrapper: ElementRef;
  @ViewChild('header', { read: ElementRef }) header: ElementRef;

  @ViewChild(DrawerDirective, {static: true}) drawerHost: DrawerDirective;
  @ViewChild(DrawerPreviewDirective, {static: true}) drawerPreviewHost: DrawerPreviewDirective;

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
    this.setScreenDimmensions();
    this.platform.ready().then(() => {
      if (this.platform.isPortrait()) {
        this.drawerHeight = this.screenHeight;
      } else {
        this.drawerHeight = this.screenWidth;
      }
      // this.drawerHeight = this.platform.height();
      // console.log(`Drawer Height: ${this.platform.height()}`);
      this.setDrawerState(this.drawerService.drawerState, false, false);
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
    this.setDrawerState(state, true, true)
  }

  @Input()
  set drawerType(type: DrawerType) {
    this.loadDynamicComponent(type);
  }

  constructor(private drawerService: DrawerService, private componentFactoryResolver: ComponentFactoryResolver, private gestureController: GestureController, private platform: Platform, private ngZone: NgZone) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.setScreenDimmensions();
    })
  }

  ngAfterViewInit() {
    this.initGesture();
    this.previewHeight = this.previewWrapper.nativeElement.offsetHeight;
  }

  loadDynamicComponent(type: DrawerType): Promise<void> {
    return new Promise((resolve, reject) => {
      var dynamicPreviewComponent: AdItem
      var dynamicComponent: AdItem

      switch(type) {
        case DrawerType.Cart:
          dynamicPreviewComponent = new AdItem(CartPreviewComponent, { name: "Cart Preview" });
          dynamicComponent = new AdItem(CartComponent, { name: "Cart Body" }, this.setPreviewState);
          break;
        case DrawerType.Demo:
          dynamicPreviewComponent = new AdItem(DemoComponent, { name: "Test Preview" });
          dynamicComponent = new AdItem(DemoComponent, { name: "Tyler Pashigian" });
          break;
        default:
          break;
      }

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent.component);
      const viewContainerRef = this.drawerHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
      componentRef.instance.data = dynamicComponent.data;

      const componentPreviewFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicPreviewComponent.component);
      const viewPreviewContainerRef = this.drawerPreviewHost.viewContainerRef;
      viewPreviewContainerRef.clear();

      const componentPreviewRef = viewPreviewContainerRef.createComponent<AdComponent>(componentPreviewFactory);
      componentPreviewRef.instance.data = dynamicPreviewComponent.data;
      componentPreviewRef.instance.openDrawerCallback = this.setOpenState;

      try {
        // console.log(`Header height: ${this.header.nativeElement.offsetHeight}`);
        // let timer = setTimeout(resolve, 100);
        setTimeout(() => {
          this.ngZone.run(() => {
            resolve();
          });
        }, 100);
      } catch(error) { reject(); }
    })
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

  setDrawerState(state: DrawerState, animate: boolean, rerender: boolean) {

    try  {
      const drawer = this.drawer.nativeElement;
      drawer.style.transition = animate ? '.4s ease-out' : '';
    } catch { console.log("Failed to find drawer") }

    if (rerender) {
      this.isOpen = this.drawerService.drawerState != DrawerState.Preview
      this.previewWrapper.nativeElement.style.display = state != DrawerState.Open ? "flex" : "none"
      this.loadDynamicComponent(this.drawerService.drawerType)
    }

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

  outerHeight(element) {
    const height = element.offsetHeight,
        style = window.getComputedStyle(element)

    return ['top', 'bottom']
        .map(side => parseInt(style[`margin-${side}`]))
        .reduce((total, side) => total + side, height)
  }

  setOpenState() {
    this.drawerService.drawerState = DrawerState.Open
  }

  setPreviewState() {
    this.drawerService.drawerState = DrawerState.Preview
  }

  openPreview() {
    const drawer = this.drawer.nativeElement;
    try {
      this.loadDynamicComponent(this.drawerService.drawerType).then(() => {
        this.previewHeight = this.outerHeight(this.header.nativeElement);

        let deltaHeight: number = this.drawerHeight - this.previewHeight
        drawer.style.top = `calc(${deltaHeight}px - env(safe-area-inset-bottom))`;
        this.drawerService.drawerState = DrawerState.Preview
      });
    } catch { console.log("Error recalculating height") }
  }

  openDrawer() {
      const drawer = this.drawer.nativeElement;
      drawer.style.top = `${this.drawerHeight*.05}px`;
      this.drawerService.drawerState = DrawerState.Open
  }

  closeDrawer() {
      const drawer = this.drawer.nativeElement;
      drawer.style.top = `${this.drawerHeight}px`
      this.drawerService.drawerState = DrawerState.Closed
  }

}
