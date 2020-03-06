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
      return this.httpclient.get(URL+'/transaction/transactions')
    }
    /** POST: add a new hero to the database */
    addCustomer(walletData: WalletData): Observable<any> {
        let httpHeaders = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Cache-Control': 'no-cache'
             });    
             let options = {
            headers: httpHeaders
             };  
      return this.httpclient.post('http://localhost:8080/wallet', walletData,
      options);
    }
}    