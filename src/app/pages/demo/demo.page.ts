import { Component, ComponentFactoryResolver, OnInit, ViewChild, ElementRef, Input, HostListener, Type } from '@angular/core';
import { DemoComponent } from 'src/app/components/demo/demo.component';
import { DrawerDirective } from 'src/app/components/drawer/drawer.directive';
import { MenuItem } from 'src/app/models/menuItem';

export class DemoItem {
  constructor(public component: Type<any>, public data: any, public menuItem?: MenuItem) {}
}

export interface DemoDynamicComponent {
  data: any;
  openDrawerCallback?: () => void
}

enum DemoType {
  One,
  Two,
  Three
}

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {

  @ViewChild(DrawerDirective, {static: true}) drawerHost: DrawerDirective;
  @ViewChild('contentWrapper', { read: ElementRef }) contentWrapper: ElementRef;

  showTemplate = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {}

  loadDynamicComponent(type: DemoType): Promise<void> {
    return new Promise((resolve, reject) => {
      this.showTemplate = true;
      var dynamicComponent: DemoItem
      this.contentWrapper.nativeElement.style = {}
      switch(type) {
        case DemoType.One:
          dynamicComponent = new DemoItem(DemoComponent, { name: "Demo One Component" });
          break;
        case DemoType.Two:
          const menuItem: MenuItem  = {
            id: "1",
            description: "Short description",
            title: "Test Card",
            price: "10"
          };
          dynamicComponent = new DemoItem(DemoComponent, { name: "Demo Two Component" });
          break;
        case DemoType.Three:
          dynamicComponent = new DemoItem(DemoComponent, { name: "Demo Three Component" });
          break;
        default:
          break;
      }
  
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent.component);
      const viewContainerRef = this.drawerHost.viewContainerRef;
      viewContainerRef.clear();
  
      const componentRef = viewContainerRef.createComponent<DemoDynamicComponent>(componentFactory);
      componentRef.instance.data = dynamicComponent.data;
  
      // componentPreviewRef.instance.openDrawerCallback = this.setOpenState;
      
      try {
        let timer = setTimeout(resolve, 1);
        // const refElement = document.querySelector("app-demo") as HTMLElement;
        // console.log(`Header height: ${refElement.offsetHeight}`);
        // // console.log(this.contentWrapper.nativeElement.offsetHeight);
        // console.log(viewContainerRef.element.nativeElement);
        // resolve();
      } catch(error) {
        reject();
      }
    })

  }

  outerHeight(element) {
    const height = element.offsetHeight,
        style = window.getComputedStyle(element)

    return ['top', 'bottom']
        .map(side => parseInt(style[`margin-${side}`]))
        .reduce((total, side) => total + side, height)
  }

  setDemo1View() {
    this.loadDynamicComponent(DemoType.One).then(() => {
      this.contentWrapper.nativeElement.style.padding = "16px";
      console.log(this.outerHeight(this.contentWrapper.nativeElement));
    })
  }

  setDemo2View() {
    this.loadDynamicComponent(DemoType.Two)
    this.contentWrapper.nativeElement.style.padding = "24px";
    console.log(this.contentWrapper.nativeElement.offsetHeight);
  }

  hideTemplate() {
    this.showTemplate = false;
  }

}
