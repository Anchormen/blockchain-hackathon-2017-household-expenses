import { Injectable } from '@angular/core';

import { LoginForm } from "../";
import { ApiService } from "./api.service";
@Injectable()
export class AuthService {

    constructor(private apiService: ApiService) { }

    login(loginData: LoginForm) {
        return this.apiService.post('login', loginData);
    }
}
