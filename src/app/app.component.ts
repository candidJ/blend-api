import { Component } from '@angular/core';

@Component({
  selector: 'ba-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Blend API';
}
