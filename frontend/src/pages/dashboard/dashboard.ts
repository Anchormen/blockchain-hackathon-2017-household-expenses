import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  accountData: any = null;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, public authService: AuthService) {
    this.authService.getAccountdata().subscribe(res => {
      this.accountData = res;
    }, err => {
      console.error('couldnt get household data');
    })
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Dashboard, {
      item: item
    });
  }
}
