import { Component, OnInit, Input } from '@angular/core';
import { Drawer } from '../drawer/drawer.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit, Drawer {

  @Input() data: any;

  constructor() {}

  ngOnInit() {}

}
