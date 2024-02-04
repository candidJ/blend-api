import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[blendApiAppHighlighted]',
  exportAs: 'hl',
  standalone: true,
})
export class HighlightedDirective {
  constructor() {}

  @Input('highlighted')
  isHighlighted = false;

  @HostBinding('class.h-hover')
  get cssClass() {
    return this.isHighlighted;
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver() {
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
