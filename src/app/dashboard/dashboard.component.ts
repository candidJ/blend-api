import { Component, OnInit } from '@angular/core';
import { INavbar } from '../shared/interface/interface';
import { AppConfig } from '../shared/constant/config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public navbarItems: INavbar;

  constructor() { }

  configureNavItems(): INavbar {

    return this.navbarItems = {
      logo: AppConfig.IMAGES.LOGO,
      routerLink: "/dashboard",
      navbarMenu: [
        {
          title: "Quotes",
          hasSubMenu: true,
          icon: "book",
          routerLink: "/quotes",
          subMenu: [{
            icon: "code",
            title: "Programming",
            hasSubMenu: false,
            routerLink: "programming"
          }, {
            icon: "clipboard",
            title: "Life",
            hasSubMenu: false,
            routerLink: "life"
          }]
        },
        {
          title: "News",
          hasSubMenu: false,
          icon: "book-open",
          routerLink: "/news"
        },
        {
          title: "Weather",
          hasSubMenu: false,
          icon: "cloud",
          routerLink: "/weather"
        }
      ]
    };

  }

  ngOnInit(): void {
    this.configureNavItems();
  }

}
