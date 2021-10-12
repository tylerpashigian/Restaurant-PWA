import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-dynamic-image',
  templateUrl: './dynamic-image.component.html',
  styleUrls: ['./dynamic-image.component.scss'],
})
export class DynamicImageComponent implements OnChanges {
  @Input() altText: string;
  @Input() ratio: { w: number; h: number } = { w: 1, h: 1 };
  @Input() src: string = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    const ratio_height = (this.ratio.h / this.ratio.w) * 100 + '%';
    // Conserve aspect ratio (see: https://stackoverflow.com/a/10441480/1116959)
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'padding',
      '0px 0px ' + ratio_height + ' 0px'
    );
    this.update();
  }

  update() {
    this.loaded(false);
  }

  loaded(isLoaded: boolean) {
    if (isLoaded) {
      setTimeout(() => {
        this.renderer.addClass(this.elementRef.nativeElement, 'img-loaded');
      }, 500);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'img-loaded');
    }
  }
}
