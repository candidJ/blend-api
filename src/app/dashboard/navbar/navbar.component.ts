import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/utils/config.constant';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public logo: SafeStyle;

  constructor() { }

  ngOnInit(): void {
    this.logo = AppConfig.IMAGES.LOGO;
  }

}
