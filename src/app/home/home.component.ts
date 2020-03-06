import { Component, OnInit } from '@angular/core';
import { Transaction } from '../model/transaction';
import { EledgerApiService } from '../services/eledgerapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  txns: Transaction[];
  constructor(private eledgerService: EledgerApiService) { }

  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  ngOnInit() {


    this.eledgerService.getTxn()
      .subscribe(data => {
        console.log(data);
        this.txns =
          data["data"];
    })
  }

}
