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
    private apiBase: string = 'http://10.20.101.127:8081/';

    constructor(private apiService: ApiService, public storage: Storage, public http: Http) { }

    login(loginData: LoginForm) {
        let request = this.http.post(this.apiBase + 'user/login', loginData)
            .map(res => res.json());

        request.subscribe(res => {            
            console.log("Saving data from res", res)
            this.authStatus.next(res.login);            
            this.storage.set("id_token", res.token);
        });
        return request;

    }
    logout() {
        localStorage.removeItem("token")
    }
    getLoginStatus() {
        return localStorage.getItem("token");
    }
    getAccountdata() {
        let request$ = this.apiService.getData('household/account/123');
        return request$;
    }
    getDebitors() {
        let observable$ = new Observable(observer => {
            observer.next(this.fauxDebitors)
        });
        return observable$;
    }
    getHousehouldData() {
        let request = this.apiService.getData('household/1');
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
    startPayingCreditor(creditor: Creditor) {
        return this.apiService.postData('startDebitorPayments', {
            creditor: creditor.name
        });
    }
    get fauxCreditors() {
        return [
            new Creditor("KPN", true, 120),
            new Creditor("Woningbouw", true, 421),
            new Creditor("Eneco", false, 89),
            new Creditor("Private lease Co", false, 339),
            new Creditor("Waterbedrijf", true, 13),
        ]
    }
    get fauxDebitors() {
        return [
            new Debitor("UWV", 505),
            new Debitor("Gemeente", 240),
            new Debitor("Belastingdienst", 110),
            new Debitor("Toeslagen", 90),
        ]
    }
}


