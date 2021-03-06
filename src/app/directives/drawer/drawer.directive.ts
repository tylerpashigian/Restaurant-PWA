import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[drawerHost]'
})
export class DrawerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
