import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MerchantListService {
    constructor(private httpclient: HttpClient) { }
    getWalletByParameter(): Observable<any> {
        return this.httpclient.get("http://localhost:8080/wallet/lenderId/mar1");
    }
}