import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer/drawer.service';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss'],
})
export class CartPreviewComponent implements OnInit {

  data: any
  openDrawerCallback: () => void

  constructor(private drawerService: DrawerService) { }

  ngOnInit() {}

}
