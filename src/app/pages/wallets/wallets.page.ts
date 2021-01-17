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
  walletDetails;
  constructor(private store: StoreService) { }

  ngOnInit() {
    this.store.getWallet().subscribe((wallet: Wallet) => {
      if (!wallet) {
        return;
      }
      this.wallet = wallet;
      this.store.loadWalletDetails(this.wallet.id);
      this.store.loadTransactions(this.wallet.id);
    });
    this.store.getWalletDetails().subscribe(walletDetails => {
      if (!walletDetails) {
        return;
      }
      this.walletDetails = walletDetails;
    });
  }

}
