import { PAYMENTURL } from './../static/properties';
import { EledgerApiService } from './../services/eledgerapi.service';
import { WalletData } from '../model/walletdata';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class EledgerApi extends EledgerApiService {
    getEledgerApi(customUrl: string): Observable<any> {
        let url = PAYMENTURL + customUrl;
        return this.get(url);
    }

    postEledgerApi(walletData: WalletData): Observable<any> {
        return this.post(PAYMENTURL, walletData);
    }
}