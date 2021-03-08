import { Type } from "@angular/core";

export class DynamicDrawerItem {
  constructor(
    public component: Type<any>, 
    public data: any, 
    public openPreview: () => void = () => {}
  ) {}
}

export interface DynamicDrawerComponent {
  data: any;
  openDrawerCallback?: () => void
}