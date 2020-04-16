import { HeaderData } from './../model/headerData';
import { WalletData } from './../model/walletdata';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EledgerApiService {
    constructor(private httpclient: HttpClient) { }

    get(url: string): Observable<any> {
        return this.httpclient.get(url)
    }

    post(url: string, walletData: WalletData): Observable<any> {
        return this.httpclient.post(url + '/wallet', walletData);
    }

    postUser(url: string, any): Observable<any> {
        return this.httpclient.post(url, any);
    }

    putUser(url: string, any): Observable<any> {
        return this.httpclient.put(url, any);
    }

    delete(url: string): Observable<any> {
        return this.httpclient.delete(url);
    }

    headerchange: EventEmitter<string> = new EventEmitter();

    public emitHeaderChangeEvent(headerData) {
        this.headerchange.emit(headerData);
    }
    getHeaderChangeEmitter() {
        return this.headerchange;
    }
}    