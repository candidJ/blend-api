import { Component, OnInit } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { AppConfig } from 'src/app/shared/constant/config';

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
