import { Injectable, EventEmitter, Output } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Creditor } from "../models/creditor";
import { Debitor } from "../models/debitor";
import { LoginForm } from "../";
import { ApiService } from "./api.service";
import { Subject } from "rxjs/Subject";


import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    authStatus: Subject<boolean> = new Subject<boolean>();
    authStatusChanged$ = this.authStatus.asObservable();
    constructor(private apiService: ApiService, public storage: Storage) { }

    login(loginData: LoginForm) {
        let request = this.apiService.post('household/login', loginData)
            .map(res => res.json());

        request.subscribe(res => {
            this.authStatus.next(res.isLoggedIn);
            localStorage.setItem("token", res.token);
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
        let request$ = this.apiService.get('household/account/123');
        return request$;
    }
    getDebitors() {
        let observable$ = new Observable(observer => {
            observer.next(this.fauxDebitors)
        });
        return observable$;
    }

    getCreditors() {
        let observable$ = new Observable(observer => {
            observer.next(this.fauxCreditors)
        });
        return observable$;
    }
    stopPayingCreditor(creditor: Creditor) {
        return this.apiService.post('stopDebitorPayments', {
            debitor: creditor.name
        });
    }
    startPayingCreditor(creditor: Creditor) {
        return this.apiService.post('startDebitorPayments', {
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


