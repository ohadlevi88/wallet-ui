import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wallets } from 'src/app/model/wallets';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  constructor(private store: StoreService,  private router: Router) { }

  ngOnInit() {
  }
  pay(form){
    let transfer = {
      id: Wallets.getWalletId(form.value.name).id,
      amount: form.value.amount
    }
    this.store.pay(transfer).subscribe(data => {
      let walletId = this.store.wallet.getValue().id;
      this.store.loadTransactions(walletId);
      this.store.loadWalletDetails(walletId);
      this.router.navigateByUrl('transactions');
    });
  }
}
