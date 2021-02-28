import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from '../drawer/drawer.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit, AdComponent {

  @Input() data: any;

  constructor() {}

  ngOnInit() {}

}
