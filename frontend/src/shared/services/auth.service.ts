import { Injectable, EventEmitter, Output } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Creditor } from "../models/creditor";
import { Http, Response } from '@angular/http';
import { Debitor } from "../models/debitor";
import { LoginForm } from "../";
import { ApiService } from "./api.service";
import { Subject } from "rxjs/Subject";


import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    authStatus: Subject<boolean> = new Subject<boolean>();
    authStatusChanged$ = this.authStatus.asObservable();
    private apiBase: string = 'http://127.0.0.1:8081/';

    constructor(private apiService: ApiService, public storage: Storage, 
        public http: Http) { }

    login(loginData: LoginForm) {
        let request = this.http.post(this.apiBase + 'user/login', loginData)
            .map(res => res.json());

        request.subscribe(res => {
            console.log("Saving data from res", res)
            this.authStatus.next(res.login);
            this.storage.set("id_token", res.token);
            localStorage.setItem("id_token", res.token);
        });
        return request;

    }
    logout() {
        this.storage.remove("id_token").then(res =>{
            console.log("removal resulted in", res);
        })
        localStorage.removeItem("id_token");
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            this.storage.get("id_token").then(res => {                
                resolve(res != undefined);
            })
        }) 
    }
    getAccountdata() {
        let request$ = this.apiService.postData('creditor/send_transaction', {
            creditorAddress: "1",
            creditorName: "John",
            amount: 123,
            householdId: 123
        });
        //let request$ = this.apiService.getData('household/account/123');
        return request$;
    }
    getDebitors() {
        let observable$ = new Observable(observer => {
            observer.next(this.fauxDebitors)
        });
        return observable$;
    }
    getHousehouldData() {
        let request = this.apiService.postData('household/account/1', {

        });
        return request;
    }
    getCreditors() {
        let observable$ = new Observable(observer => {
            observer.next(this.fauxCreditors)
        });
        return observable$;
    }
    stopPayingCreditor(creditor: Creditor) {
        return this.apiService.postData('stopDebitorPayments', {
            debitor: creditor.name
        });
    }
    saveSettings(creditors: Array<Creditor>) {
        let saveData = { companies: [], householdId: 1};
        creditors.forEach((c: Creditor) => {
            saveData.companies.push({
                creditor: c.name,
                active: c.active
            });
        });
        return this.apiService.postData('household/account/1', saveData);
    }
    get fauxCreditors() {
        return [
            new Creditor("KPN", true, 120),
            new Creditor("Woningbouw", true, 421),
            new Creditor("Eneco", false, 89),
            new Creditor("Private lease Co", false, 339),
            new Creditor("Waterbedrijf", true, 13),
        ];
    }
    get fauxDebitors() {
        return [
            new Debitor("UWV", 505),
            new Debitor("Gemeente", 240),
            new Debitor("Belastingdienst", 110),
            new Debitor("Toeslagen", 90),
        ];
    }
}


