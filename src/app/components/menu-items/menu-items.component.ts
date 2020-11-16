import { Component, OnInit, Input } from '@angular/core';

import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {

  @Input() category: Category;

  constructor() {}

  ngOnInit() {}

}
