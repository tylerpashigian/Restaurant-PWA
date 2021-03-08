import { 
  AfterViewInit, 
  Component, 
  ComponentFactoryResolver, 
  ElementRef, 
  HostListener, 
  OnInit, 
  ViewChild 
} from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';
import { DrawerDirective } from '../../directives/drawer/drawer.directive';
import { DrawerService } from 'src/app/services/drawer/drawer.service';
import { DrawerState, DrawerType } from 'src/app/models/drawerState';
import { CartComponent } from './cart/cart/cart.component';
import { DrawerPreviewDirective } from '../../directives/drawerPreview/drawer-preview.directive';
import { CartPreviewComponent } from './cart/cart-preview/cart-preview.component';
import { DynamicDrawerComponent, DynamicDrawerItem } from 'src/app/models/dynamicDrawerItem';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @ViewChild('previewWrapper', { read: ElementRef }) previewWrapper: ElementRef;

  @ViewChild(DrawerDirective, {static: true}) drawerHost: DrawerDirective;
  @ViewChild(DrawerPreviewDirective, {static: true}) drawerPreviewHost: DrawerPreviewDirective;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setDrawerState(this.drawerService.drawerState, false);
  }

  isOpen: boolean = false;
  previewHeight: number;
  deltaY: number = 0

  drawerType: DrawerType;
  drawerState: DrawerState;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private drawerService: DrawerService, 
    private gestureController: GestureController, 
    private platform: Platform
  ) { }

  ngOnInit() {
    this.drawerType = this.drawerService.drawerType;
    this.drawerService.drawerTypeChanged.subscribe((type: DrawerType) => {
      this.drawerType = type;
      this.setDrawerState(this.drawerState, true);
    });

    this.drawerState = this.drawerService.drawerState;
    this.drawerService.drawerStateChanged.subscribe((state: DrawerState) => {
      this.drawerState = state;
      this.setDrawerState(state, true);
    });
  }

  ngAfterViewInit() {
    this.initGesture();
  }

  loadDynamicComponent(type: DrawerType): Promise<void> {
    return new Promise((resolve, reject) => {
      var dynamicPreviewComponent: DynamicDrawerItem
      var dynamicComponent: DynamicDrawerItem

      switch(type) {
        case DrawerType.Cart:
          dynamicPreviewComponent = new DynamicDrawerItem(CartPreviewComponent, { previewCtaText: "Cart Preview" });
          dynamicComponent = new DynamicDrawerItem(CartComponent, { drawerBodyText: "Cart Body" });
          break;
        default:
          break;
      }

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent.component);
      const viewContainerRef = this.drawerHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent<DynamicDrawerComponent>(componentFactory);
      componentRef.instance.data = dynamicComponent.data;

      const componentPreviewFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicPreviewComponent.component);
      const viewPreviewContainerRef = this.drawerPreviewHost.viewContainerRef;
      viewPreviewContainerRef.clear();

      const componentPreviewRef = viewPreviewContainerRef.createComponent<DynamicDrawerComponent>(componentPreviewFactory);
      componentPreviewRef.instance.data = dynamicPreviewComponent.data;
      componentPreviewRef.instance.openDrawerCallback = this.setOpenState;

      try {
        // This feels hacky, might look into NgZone docs for alternative solution
        setTimeout(resolve, 100);
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
    if (y < -this.platform.height() * .9) return;
    if (y > 0) return;
    // drawer.style.transform = `translateY(${y}px)`;
  }

  endEvent(ev) {
    this.deltaY = this.deltaY + ev.deltaY;
  }

  setDrawerState(state: DrawerState, animate: boolean) {

    try  {
      const drawer = this.drawer.nativeElement;
      drawer.style.transition = animate ? '.4s ease-out' : '';
    } catch { console.log("Failed to find drawer") }

    this.isOpen = this.drawerState == DrawerState.Open
    this.previewWrapper.nativeElement.style.display = state != DrawerState.Open ? "block" : "none"

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
    this.drawerService.setState(DrawerState.Open)
  }

  setPreviewState() {
    this.drawerService.setState(DrawerState.Preview)
  }

  openPreview() {
    this.loadDynamicComponent(this.drawerService.drawerType).then(() => {
      this.previewHeight = this.outerHeight(this.previewWrapper.nativeElement);
      let deltaHeight: number = this.platform.height() - this.previewHeight
      const drawer = this.drawer.nativeElement;
      drawer.style.top = `${deltaHeight}px`;
    });
  }

  openDrawer() {
    this.loadDynamicComponent(this.drawerService.drawerType).then(() => {
      const drawer = this.drawer.nativeElement;
      drawer.style.top = `${this.platform.height()*.05}px`;
    });
  }

  closeDrawer() {
    this.loadDynamicComponent(this.drawerService.drawerType).then(() => {
      const drawer = this.drawer.nativeElement;
      drawer.style.top = `${this.platform.height() + 20}px`
    });
  }

}
