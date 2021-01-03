import { Component, OnInit } from '@angular/core';
import { Wallet, Wallets } from 'src/app/model/wallets';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit {

  wallet: Wallet;
  constructor(private store: StoreService) { }

  ngOnInit() {
    this.store.getWallet().subscribe((wallet: Wallet) => {
      this.wallet = wallet;
      this.store.loadBalance(this.wallet.id);
      this.store.loadTransactions(this.wallet.id);
    });
  }

}
