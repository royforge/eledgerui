import { SessionModel } from './../model/sessionmodel';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lenderId = sessionStorage.getItem('lenderId');
  shopName = sessionStorage.getItem('shopName');
  phone = sessionStorage.getItem('phone');
  name = sessionStorage.getItem('name');



}
