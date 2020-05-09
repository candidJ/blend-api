import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { AppConfig } from 'src/app/shared/constant/config';
import { INavbarMenu, INavbar } from 'src/app/shared/interface/interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  // public logo: SafeStyle;

  @Input('navbarItems') navbarItems: INavbar;

  constructor() { }

  ngOnInit(): void {
    // this.logo = AppConfig.IMAGES.LOGO;
  }

}
