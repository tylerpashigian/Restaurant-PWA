import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[drawerPreviewHost]'
})
export class DrawerPreviewDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
