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
          icon: "clipboard",
          routerLink: "/quotes",
          subMenu: [{
            icon: "code",
            title: "Programming",
            hasSubMenu: false,
            routerLink: "programming"
          }, {
            icon: "award",
            title: "Life",
            hasSubMenu: false,
            routerLink: "life"
          }]
        },
        {
          title: "Weather",
          hasSubMenu: false,
          icon: "cloud-lightning",
          routerLink: "/weather"
        },

        // NEWS API org api only works in Developer mode. Uncomment to access when running locally.
        // {
        //   title: "News",
        //   hasSubMenu: false,
        //   icon: "file-text",
        //   routerLink: "/news"
        // },
        {
          title: "Hacker News",
          hasSubMenu: false,
          icon: "file-text",
          routerLink: "/news"
        }
      ]
    };

  }

  ngOnInit(): void {
    this.configureNavItems();
  }

}
