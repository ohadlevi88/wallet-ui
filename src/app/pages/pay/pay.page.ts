import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Wallet, Wallets } from 'src/app/model/wallets';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  listOfWallets: Wallet[];
  walletId: string;

  constructor(private store: StoreService, private router: Router) { }

  ngOnInit() {
    this.walletId = this.store.wallet.getValue().id;
    this.listOfWallets = Wallets.getAllWallets(this.walletId);
  }
  pay(form) {
    let transfer = {
      id: form.value.id,
      amount: form.value.amount
    }
    this.store.pay(transfer).subscribe(data => {
      this.store.loadTransactions(this.walletId);
      this.store.loadWalletDetails(this.walletId);
      this.router.navigateByUrl('transactions');
    });
  }
  addMember(){
    this.router.navigateByUrl('invite');
  }
}
