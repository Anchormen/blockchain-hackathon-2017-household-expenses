import { Injectable } from '@angular/core';
import {LoginForm} from "../";
@Injectable()
export class AuthService {

    constructor() { }

    login(loginData: LoginForm) {
        console.log("Logging in with", loginData)
    }
}
