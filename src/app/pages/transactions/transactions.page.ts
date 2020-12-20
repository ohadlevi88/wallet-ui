import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  balance: number;
  constructor(private store: StoreService) { }

  ngOnInit() {
    this.store.getBalance().subscribe(userBalance => {
      if (!userBalance) {
        return;
      }
      this.balance = userBalance.balance;
    })
  }

}
