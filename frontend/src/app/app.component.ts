import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
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
  
  constructor(public platform: Platform, public authService: AuthService,
    public alert: AlertController) {
    this.initializeApp();
    this.authService.getLoginStatus().then(res => {
      this.isLoggedIn = res !== null;
    })
    this.pages = [      
      { title: 'Login', component: Login},
      { title: 'Dashboard', component: Dashboard }      
    ];

  }



  initializeApp() {
    this.platform.ready().then(() => {      
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.authService.authStatus.subscribe(res => {
        this.isLoggedIn = res;
      })
    });
  }
  openDashboardPage() {
    this.nav.setRoot(Dashboard);
  }
  logout() {
    let alert = this.alert.create({
      title: "Log off",
      message: "Are you sure you want to log off?",
      buttons : [
        {
          text: "No"
        },
        {
          text: "Yes",
          handler: () => {
            this.authService.logout();
            this.nav.setRoot(Login);  
          }
        }
      ]
    });
    alert.present();
  }
}
