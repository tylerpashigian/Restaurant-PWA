import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementor',
  templateUrl: './incrementor.component.html',
  styleUrls: ['./incrementor.component.scss'],
})
export class IncrementorComponent implements OnInit {

  @Input() count: number = 0;

  @Output() countChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  addItem(): void {
    this.count++;
    this.countChange.emit(this.count);
  }

  removeItem(): void {
    this.count--;
    this.countChange.emit(this.count);
  }

}
