import { UserData } from './../model/UserData';
import { WalletData } from './../model/walletdata';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class EledgerApiService {

    constructor(private httpclient: HttpClient) { }

    get(url: string): Observable<any> {
        return this.httpclient.get(url);
    }

    post(url: string, walletData: WalletData): Observable<any> {
        return this.httpclient.post(url + '/wallet', walletData);
    }

    postUser(url: string, userData: UserData): Observable<any> {
        return this.httpclient.post(url, userData);
    }
}    