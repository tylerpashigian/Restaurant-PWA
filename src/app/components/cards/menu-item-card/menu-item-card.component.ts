import { Component, OnInit, Input } from '@angular/core';

import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss'],
})
export class MenuItemCardComponent implements OnInit {

  @Input() cardModel: Category;

  constructor() {}

  ngOnInit() {}

}
