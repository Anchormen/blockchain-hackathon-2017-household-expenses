import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Dashboard } from '../pages/dashboard/dashboard';
import { Login } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { AuthService } from "../shared/services/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  pages: Array<{title: string, component: any}>;
  isLoggedIn: boolean = false;
  constructor(public platform: Platform, public authService: AuthService) {
    this.initializeApp();

    this.pages = [      
      { title: 'Login', component: Login},
      { title: 'Dashboard', component: Dashboard },
      { title: 'Logout',  component: LogoutPage }
    ];

  }



  initializeApp() {
    this.platform.ready().then(() => {      
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.authService.authStatus.subscribe((isLoggedIn : boolean) => {
        this.isLoggedIn = isLoggedIn;
      })
    });
  }

  openPage(page) {    
    this.nav.setRoot(page.component);
  }
}
