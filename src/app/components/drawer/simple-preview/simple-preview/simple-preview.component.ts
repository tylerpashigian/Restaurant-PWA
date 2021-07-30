import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer/drawer.service';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './simple-preview.component.html',
  styleUrls: ['./simple-preview.component.scss'],
})
export class SimplePreviewComponent implements OnInit {

  data: any
  openDrawerCallback: () => void

  constructor(private drawerService: DrawerService) { }

  ngOnInit() {}

}
