import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlighted]',
  exportAs: 'hl'
})
export class HighlightedDirective {

  constructor() { }

  @Input('highlighted')
  isHighlighted = false;

  @HostBinding('class.is-family-monospace')
  get cssClass() {
    return this.isHighlighted;
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver($event) {
    console.log($event);
    this.isHighlighted = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHighlighted = false;
  }

  toggle() {
    this.isHighlighted = !this.isHighlighted;
  }

}
