import { EledgerApiService } from './../services/eledgerapi.service';
import { SessionModel } from './../model/sessionmodel';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Keys } from '../model/key';
import { EledgerUser } from '../classes/EledgerUser';
import { HeaderData } from '../model/headerData';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  headerData = new HeaderData();
  sessionModel = new SessionModel();
  response: any;
  lenderId: string;
  shopName: string;
  phone: string;
  name: string;
  email: string;
  id: string;
  url: string;
  constructor(private notify: AlertService, private eledgerUser: EledgerUser, private service: EledgerApiService) { }

  ngOnInit(): void {
    this.headerData.title = "Your Account";
    this.headerData.isHeader = true;
    this.headerData.isIcon = false;
    this.service.emitHeaderChangeEvent(this.headerData);
    this.id = this.sessionModel.getSession(Keys.id);
    this.sessionModel.setSession(Keys.id, this.id);
    this.lenderId = this.sessionModel.getSession(Keys.lenderId);
    this.url = "/lenderId/" + this.lenderId;

    //User Management Api to get data of lender using lenderId
    this.eledgerUser.getEledgerLenders(this.url).subscribe(resp => {
      this.response = resp["data"]
      if (this.response.lenderId == this.lenderId) {
        this.shopName = this.response.shopName;
        this.phone = this.response.phone;
        this.name = this.response.name;
        this.email = this.response.email;
      }
    });
  }
}