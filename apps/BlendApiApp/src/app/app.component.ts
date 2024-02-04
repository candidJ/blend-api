import { Component } from '@angular/core';
import {
  AppLogoWithLink,
  NavbarMenu,
  NavbarMenuItems,
} from '@blend-api/shared';
import { NotificationsModule } from '../../../../libs/shared/src/lib/modules/notifications/notifications.module';
import { LoaderModule } from '../../../../libs/shared/src/lib/modules/loader/loader.module';
import { RouterOutlet } from '@angular/router';
import { NavbarModule } from '../../../../libs/shared/src/lib/modules/navbar/navbar.module';

@Component({
    selector: 'ba-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        NavbarModule,
        RouterOutlet,
        LoaderModule,
        NotificationsModule,
    ],
})
export class AppComponent {
  title = 'Blend API';
  appLogoWithLink = AppLogoWithLink;
  navbarMenuItems: Array<NavbarMenu> = NavbarMenuItems;
}
