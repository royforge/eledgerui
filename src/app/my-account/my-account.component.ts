import { EledgerApiService } from './../services/eledgerapi.service';
import { UserData } from './../model/UserData';
import { SessionModel } from './../model/sessionmodel';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Keys } from '../model/key';
import { EledgerUser } from '../classes/EledgerUser';
import { HeaderData } from '../model/headerData';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  headerData = new HeaderData();
  response: any;
  lenderID: string;
  lenderId: string;
  shopName: string;
  phone: string;
  name: string;
  id: string;
  sessionModel = new SessionModel();
  constructor(private eledgerUser: EledgerUser, private service: EledgerApiService) { }

  ngOnInit(): void {
    this.headerData.title = "Your Account";
    this.headerData.isHeader = true;
    this.headerData.isIcon = false;
    this.service.emitHeaderChangeEvent(this.headerData);
    this.id = this.sessionModel.getSession(Keys.id);
    this.sessionModel.setSession(Keys.id, this.id);
    this.shopName = this.sessionModel.getSession(Keys.shopName);
    this.lenderID = this.sessionModel.getSession(Keys.lenderId);
    this.eledgerUser.getLenders().subscribe(response => {
      this.response = response
      for (let lender of response) {
        if (lender.lenderId == this.lenderID) {
          this.shopName = lender.shopName;
          this.phone = lender.phone;
          this.name = lender.name;
          this.lenderId = lender.lenderId;
          break;
        }
      }
    });
  }
}

