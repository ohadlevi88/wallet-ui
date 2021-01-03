import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  balance: number;
  transactions: Array<any>;

  constructor(private store: StoreService, private router: Router) { }

  ngOnInit() {
    this.store.getBalance().subscribe(balance => {
      if (!balance) {
        return;
      }
      this.balance = balance;
    });
    this.store.getTransactions().subscribe(transactions => {
      if(!transactions){
        return;
      }
      this.transactions = transactions;
    })
  }
  pay(){
    this.router.navigateByUrl('pay');
  }

}
