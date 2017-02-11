import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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
}
