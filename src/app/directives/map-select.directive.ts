import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMapSelect]',
})
export class MapSelectDirective {
  constructor() {}
  @HostListener('click') mapsMouseEvent(event: any) {
    // console.log(event);
  }
}
