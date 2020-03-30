import { EledgerApiService } from './../services/eledgerapi.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionModel } from '../model/sessionmodel';
import { Keys } from '../model/key';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  title: string = "Eledger";
  subscription: any;
  borrowerName: string;
  constructor(private service: EledgerApiService) { }

  ngOnInit(): void {
    this.subscription = this.service.getHeaderChangeEmitter()
      .subscribe(item => this.selectedHeaderItem(item));
  }

  selectedHeaderItem(item: string) {
    this.title = item;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
