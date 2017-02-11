import { Injectable } from '@angular/core';
import {  Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ApiService {
    // private apiBase: string = 'http://10.20.101.127:8081/';
    private apiBase: string = 'http://localhost:8081/';
    constructor(private http: AuthHttp) { }

    get(url: string) {
        url = this.apiBase + url;
        return this.http.get(url)
            .map(res => res.json());
    }
    post(url, data) {
        url = this.apiBase + url;
        return this.http.post(url, data);
    }
}