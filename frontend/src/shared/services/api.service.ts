import { Injectable } from '@angular/core';
import {  Response } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ApiService {
    apiBase: string = 'http://10.20.102.16:8081/';    
    constructor(private http: AuthHttp) { }

    getData(url: string) {
        url = this.apiBase + url;
        return this.http.get(url)
            .map(res => res.json());
    }
    postData(url, data) {        
        url = this.apiBase + url;
        console.log("posting to", url)
        return this.http.post(url, data);
    }
}