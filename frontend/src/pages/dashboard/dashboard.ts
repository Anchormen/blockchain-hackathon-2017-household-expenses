import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { tokenNotExpired, JwtHelper } from "angular2-jwt";

import { Login } from "../login/login";

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
  datahHasChanged: boolean = false;
  viewMode = 'creditors';
  balance: number;

  constructor(public navCtrl: NavController, public alert: AlertController,
    public navParams: NavParams, public authService: AuthService, 
    public storage: Storage) {
    this.storage.get("id_token").then(res => {
      if (!res) {
        this.navCtrl.setRoot(Login);
      } else {
        
      }
    })


    this.balance = 0;
    // this.authService.getAccountdata().subscribe(res => {
    //   this.accountData = res;
    // }, err => {
    //   console.error('couldnt get household data');
    // })
  }
  ionViewWillEnter() {
    this.authService.getHousehouldData().subscribe(res => {
      console.log("householddata", res);
    }, err => {
      console.error("got error", err);
    })
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
      }).reduce((a, b) => a + b)
    }
    if (this.debitors && this.debitors.length > 0) {
      this.totalDebitors = this.debitors.map((debitor: Debitor) => {
        return debitor.amount
      }).reduce((n: number, t: number) => n + t);
    }
  }
  creditorStatusChange($evt, creditor: Creditor) {
    creditor.active = $evt;
    this.datahHasChanged = true;
    this.setTotals();
  }
  confirmNewDataSettings() {
    let unpaidCreditorsCount = this.creditors.filter((item: Creditor) => {
      return !item.active
    }).length;
    if (unpaidCreditorsCount > 0) {
      let alert = this.alert.create({
        title: "Are you sure?",
        enableBackdropDismiss: false,
        subTitle: `Are you sure you wish to to save these settings? ${unpaidCreditorsCount} will not be paid.`,
        buttons: [
          {
            text: 'No, cancel',
            handler: () => {
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.authService.saveSettings(this.creditors).subscribe(res => {

              })
              let alert = this.alert.create({
                title: "Payments settings saved",
                subTitle: `The payments settings have been saved`
              });
              alert.present();
              this.setTotals();
            }
          }
        ]
      });
      alert.present();
    } else {
      this.authService.saveSettings(this.creditors).subscribe(res => {

      });
      let alert = this.alert.create({
        title: "Payment settings saved",
        subTitle: `The payments settings have been saved`
      });
      alert.present();

    }
  }
}
