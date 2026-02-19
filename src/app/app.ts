import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar.component";
import { FooterComponent } from "./shared/components/footer.component";
import { CookieBannerComponent } from './shared/components/cookie-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CookieBannerComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet />
    <app-cookie-banner></app-cookie-banner>
    <app-footer></app-footer>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class App {}
