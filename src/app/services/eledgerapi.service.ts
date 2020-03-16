import { WalletData } from './../model/walletdata';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EledgerApiService {

    constructor(private httpclient: HttpClient) { }

    get(url: string): Observable<any> {
        return this.httpclient.get(url)
        .pipe(catchError(this.handleError));
    }

    post(url: string, walletData: WalletData): Observable<any> {
        return this.httpclient.post(url + '/wallet', walletData);
    }

    postUser(url: string, any): Observable<any> {
        return this.httpclient.post(url, any);

    }

    handleError(erroResponse: HttpErrorResponse) {
        if (erroResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error: ', erroResponse.error.message);
        }
        else {
            console.log('Server Side Error: ', erroResponse);
        }
        return throwError('There is some problem with the service');
    }
}    