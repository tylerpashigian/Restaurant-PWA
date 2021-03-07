import { Component, OnInit, Input } from '@angular/core';
import { DynamicDrawerComponent } from '../../models/dynamicDrawerItem';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit, DynamicDrawerComponent {

  @Input() data: any;

  constructor() {}

  ngOnInit() {}

}
