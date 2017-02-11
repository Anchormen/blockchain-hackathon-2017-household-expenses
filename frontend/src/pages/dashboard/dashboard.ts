import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../shared/services/auth.service';
import { Debitor } from "../../shared/models/debitor";
import { Creditor } from "../../shared/models/creditor";

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  accountData: any = null;
  creditors: Array<any> = null;
  totalCreditors: number = 0;
  debitors: Array<any> = null;
  totalDebitors: number = 0;
  viewMode = 'creditors';
  balance: number;

  constructor(public navCtrl: NavController, public alert: AlertController,
    public navParams: NavParams, public authService: AuthService) {
    this.balance = 0;
    this.authService.getAccountdata().subscribe(res => {
      this.accountData = res;
    }, err => {
      console.error('couldnt get household data');
    })
  }
  ionViewWillEnter() {
    this.authService.getCreditors().subscribe((res: Array<any>) => {
      this.creditors = res;
      this.setTotals();
    }, err => {

    });
    this.authService.getDebitors().subscribe((res: Array<any>) => {
      this.debitors = res;
      this.setTotals();
    }, err => {

    });
  }
  setTotals() {
    if (this.creditors && this.creditors.length > 0) {
      this.totalCreditors = this.creditors.map((item: Creditor) => {
        return item.active ? item.amount : 0;
      }).reduce((a,b) => a+b)
    }
    if (this.debitors && this.debitors.length > 0) {      
      this.totalDebitors = this.debitors.map((debitor: Debitor) => { 
        return debitor.amount}).reduce((n: number, t: number) => n + t);
    }
  }
  creditorStatusChange($evt, creditor: Creditor) {
    creditor.active = $evt;
    this.setTotals();
    // if (debitor.active) {
    //   this.authService.startPayingDebitor(debitor);
    //   let alert = this.alert.create({
    //     title: "Payments resumed",
    //     subTitle: `Payments to ${debitor.name} have been resumed`
    //   });
    //   alert.present();
    // } else {
    //   let alert = this.alert.create({
    //     title: "Are you sure?",
    //     subTitle: `Are you sure you wish to stop payments to ${debitor.name}?`,
    //     buttons: [
    //       {
    //         text: 'Nee',
    //         handler: () => {
    //           debitor.active = true;
    //         }
    //       },
    //       {
    //         text: 'Ja',
    //         handler: () => {
    //           this.authService.stopPayingDebitor(debitor);
    //           let alert = this.alert.create({
    //             title: "Payments stopped",
    //             subTitle: `Payments to ${debitor.name} have been stopped`
    //           });
    //           alert.present();
    //           this.setTotals();
    //         }
    //       }
    //     ]
    //   });
    //   alert.present();
    // }
  }
}
