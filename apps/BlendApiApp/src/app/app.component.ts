import { Component } from '@angular/core';
import { NavbarMenuItems } from '../../../../libs/shared/src';
import { INavbar } from '../../../../libs/shared/src/lib/modules/navbar/types/navbar.interface';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Blend API';
  public navbarItems: INavbar = NavbarMenuItems;
}
