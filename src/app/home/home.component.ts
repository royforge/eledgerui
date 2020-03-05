import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { EledgerService } from '../eledger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  txns: Transaction[];
  constructor(private eledgerService: EledgerService) { }

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
