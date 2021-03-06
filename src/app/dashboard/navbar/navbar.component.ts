import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { AppConfig } from 'src/app/shared/constant/config';
import { INavbarMenu, INavbar } from 'src/app/shared/interface/interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, AfterViewInit {

  // public logo: SafeStyle;

  @Input('navbarItems') navbarItems: INavbar;
  @ViewChild('navbarBurger') navbarBurger: ElementRef;
  @ViewChild('appNavBarMenu') appNavBarMenu: ElementRef;
  @ViewChildren('menuItem') menuItem: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // this.logo = AppConfig.IMAGES.LOGO;
  }

  private toggleActiveClassOnNavbarBurgerClick(event: MouseEvent) {
    if (this.navbarBurger.nativeElement.className.includes('is-active')
    ) {
      this.renderer.removeClass(this.navbarBurger.nativeElement, 'is-active');
      this.renderer.removeClass(this.appNavBarMenu.nativeElement, 'is-active');
    } else {
      this.renderer.addClass(this.navbarBurger.nativeElement, 'is-active');
      this.renderer.addClass(this.appNavBarMenu.nativeElement, 'is-active');
    }
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.navbarBurger.nativeElement, 'click', (event) => this.toggleActiveClassOnNavbarBurgerClick(event));
    this.menuItem.forEach(el => {
      this.renderer.listen(el.nativeElement, 'click', (event) => this.toggleActiveClassOnNavbarBurgerClick(event));
    });

  }

}
