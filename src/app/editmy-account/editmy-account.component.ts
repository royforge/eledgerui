import { Keys } from 'src/app/model/key';
import { SessionModel } from 'src/app/model/sessionmodel';
import { Component, OnInit } from '@angular/core';
import { EledgerUser } from '../classes/EledgerUser';
import { LenderData } from '../model/lenderData';
import { EledgerApiService } from '../services/eledgerapi.service';
import { HeaderData } from '../model/headerData';

@Component({
  selector: 'app-editmy-account',
  templateUrl: './editmy-account.component.html',
  styleUrls: ['./editmy-account.component.css']
})
export class EditmyAccountComponent implements OnInit {
  response: any;
  lenderID: string;
  lenderId: string;
  shopName: string;
  phone: string;
  name: string;
  id: string;
  password: string;
  sessionModel = new SessionModel();
  headerData = new HeaderData();

  newlenderName: string;
  newlenderPhone: string;
  newlenderShopName: string;
  newlenderId: string;
  newpassword: string;

  lender: LenderData = {
    id: undefined,
    name: undefined,
    shopName: undefined,
    lenderId: undefined,
    phone: undefined,
    password: undefined
  }

  constructor(private eledgerUser: EledgerUser, private service: EledgerApiService) { }

  ngOnInit(): void {
    this.headerData.title = "Edit Account";
    this.headerData.isHeader = true;
    this.headerData.isIcon = false;
    this.service.emitHeaderChangeEvent(this.headerData);
    this.id = this.sessionModel.getSession(Keys.id);
    this.lenderID = this.sessionModel.getSession(Keys.lenderId);
    this.eledgerUser.getLenders().subscribe(response => {
      this.response = response
      for (let lender of response) {
        if (lender.lenderId == this.lenderID) {
          this.shopName = lender.shopName;
          this.phone = lender.phone;
          this.name = lender.name;
          this.lenderId = lender.lenderId;
          this.password = lender.password;

          this.newlenderName = this.name;
          this.newlenderShopName = this.shopName;
          this.newlenderPhone = this.phone;
          this.newlenderId = this.lenderId;
          this.newpassword = this.password;
          break;
        }
      }
    });
  }

  update() {
    this.lender.id = this.id;
    this.lender.name = this.newlenderName;
    this.lender.phone = this.newlenderPhone;
    this.lender.shopName = this.newlenderShopName;
    this.lender.lenderId = this.newlenderId;
    this.lender.password = this.newpassword;
    this.eledgerUser.putLenders(this.lender).subscribe(resp => {
      this.response = resp;
    });

    this.sessionModel.setSession(Keys.name, this.newlenderName);
    this.sessionModel.setSession(Keys.phone, this.newlenderPhone);
    this.sessionModel.setSession(Keys.shopName, this.newlenderShopName);
    this.sessionModel.setSession(Keys.lenderId, this.newlenderId);
    this.sessionModel.setSession(Keys.password, this.newpassword);
    window.location.href = ("http://localhost:4200/myaccount");
  }
}
