import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  walletDetails;
  transactions: Array<any>;

  constructor(private store: StoreService, private router: Router) { }

  ngOnInit() {
    this.store.getWalletDetails().subscribe(walletDetails => {
      if (!walletDetails) {
        return;
      }
      this.walletDetails = walletDetails;
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
