import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ApiService {
    apiBase: string = 'http://127.0.0.1:8081/';
    constructor(private http: Http) {

    }

    getData(url: string) {
        url = this.apiBase + url;
        var token = localStorage.getItem("id_token");
        var header = new Headers();
        header.append("Authorization", "Bearer " + token)

        let requestOpts = new RequestOptions({ headers: header });


        return this.http.get(url, requestOpts)
            .map(res => res.json());
    }
    postData(url, data) {
        var token = localStorage.getItem("id_token");
        var header = new Headers();
        header.append("Authorization", "Bearer " + token)
        let requestOpts = new RequestOptions({ headers: header });

        url = this.apiBase + url;
        console.log("posting to", url, "with token", token)
        return this.http.post(url, data, requestOpts);
    }
}