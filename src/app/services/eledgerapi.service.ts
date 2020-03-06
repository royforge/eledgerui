import { WalletData } from './../model/walletdata';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { URL } from '../static/properties';

@Injectable()
export class EledgerApiService {

    constructor(private httpclient: HttpClient) { }

    get(customUrl: string): Observable<any> {
        //let param1 = new  HttpParams().set('lenderId/',"mar1"); 
        return this.httpclient.get(URL + customUrl);
    }

    post(walletData: WalletData): Observable<any> {
        return this.httpclient.post(URL + '/wallet', walletData);
    }
  
    /** GET txns from the server */
    getTxn() {
      return this.httpclient.get('http://localhost:8080/transaction/transactions')
    }
}    