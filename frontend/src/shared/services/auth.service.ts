import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Creditor } from "../models/creditor";
import { Debitor } from "../models/debitor";
import { LoginForm } from "../";
import { ApiService } from "./api.service";
@Injectable()
export class AuthService {

    constructor(private apiService: ApiService, public storage: Storage) { }

    login(loginData: LoginForm) {
        let request$ = this.apiService.post('household/login', loginData);
        //  request$.subscribe(res => {
        //     if(res) {
        //         this.storage.set('loggedin', true);
        //     }
        //  }, err => {

        //  })
        return request$;
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
    get fauxDebitors() {
        return [
            new Debitor("KPN", true),
            new Debitor("Woningbouw", true),
            new Debitor("Eneco", true),
            new Debitor("Waterbedrijf", true),
        ]
    }
    getCreditors() {
        let observable$ = new Observable(observer => {
            observer.next(this.fauxCreditors)
        });
        return observable$;
    }
    get fauxCreditors() {
        return [
            new Creditor("UWV"),
            new Creditor("Gemeente"),
            new Creditor("Belastingdienst"),
            new Creditor("Toeslagen"),
        ]
    }
}


