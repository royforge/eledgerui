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
}
