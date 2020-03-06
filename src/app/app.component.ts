import { EledgerUser } from './classes/EledgerUser';
import { WalletData } from './model/walletdata';
import { WALLET } from './static/properties';
import { EledgerApi } from './classes/EledgerApi';
import { Component } from '@angular/core';
import { UserData } from './model/UserData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eledgerui';
  url: string;
  walletData: WalletData[];
  userData: UserData[];
  addUser: UserData = {
    id: undefined,
    name: undefined,
    shopName: undefined,
    phone: undefined,
    lenderId: undefined
  };
  response: any;
  constructor(private _eledgerapi: EledgerApi, private _eledgeruser: EledgerUser) { }

  ngOnInit() {
    this.url = WALLET+'/lenderId/m2'
    this._eledgerapi.getEledgerApi(this.url).subscribe(
      data => {
        this.walletData = data['data'];
      })
    this._eledgeruser.getLenders().subscribe(
      data => {
        this.userData = data;
      })
      this.addUser.lenderId='m1';
      this.addUser.name='Sahil';
      this.addUser.phone=79796567;
      this.addUser.shopName='Sahil enterprises'
    this._eledgeruser.postLenders(this.addUser).subscribe(
      resp => {
        this.response.push(resp);
      }
    )
  }

}
