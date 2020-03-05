import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from './transaction';
import { Observable } from 'rxjs';
import { WalletData } from './walletdata';
import { URL } from 'src/app/static/properties'
@Injectable({
  providedIn: 'root'
})
export class EledgerService {

  private getUrl = 'http://localhost:8080/transaction/transactions';
  private postUrl = 'http://localhost:8080/wallet';

  constructor(private http: HttpClient) { }

  /** GET txns from the server */
  getTxn() {
    return this.http.get(this.getUrl)
  }
  /** POST: add a new hero to the database */
  addCustomer(wallet: WalletData): Observable<WalletData> {
    return this.http.post<WalletData>(URL, wallet)
  }
}

