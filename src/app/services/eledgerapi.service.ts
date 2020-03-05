import { WalletData } from './../model/walletdata';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL } from '../static/properties';

@Injectable()
export class EledgerApiService {

    constructor(private httpclient: HttpClient) { }

    get(customUrl: string): Observable<any> {
        return this.httpclient.get(URL + customUrl);
    }

    post(walletData: WalletData): Observable<any> {
        return this.httpclient.post(URL + '/wallet', walletData);
    }
}    