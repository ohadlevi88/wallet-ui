import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Wallet, Wallets } from '../model/wallets';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  basePath: string = "https://wallet-fin-pay.herokuapp.com/wallet/";

  balance = new BehaviorSubject<number>(null);
  balance$ = this.balance.asObservable();

  transactions = new BehaviorSubject<any[]>(null);
  transactions$ = this.transactions.asObservable();

  wallet = new BehaviorSubject<Wallet>(null);
  wallet$ = this.wallet.asObservable();

  constructor(private httpClient: HttpClient) { }

  setBalance(balance: number) {
    this.balance.next(balance);
  }
  setWallet(wallet: Wallet) {
    this.wallet.next(wallet);
  }
  setTransactions(transactions) {
    this.transactions.next(transactions);
  }

  getTransactions() {
    return this.transactions$;
  }

  getBalance() {
    return this.balance$;
  }

  getWallet() {
    return this.wallet$;
  }

  loadWallet(name: string) {
    this.setWallet(Wallets.getWalletsId(name));
  }

  loadBalance(wallwtId: string) {
    this.httpClient.get(this.basePath + wallwtId).subscribe(
      (walletDetails: any) => {
        console.log(walletDetails);
        this.setBalance(walletDetails.data.accounts[0].balance);
      },
      err => {
        console.log(err);
      }
    );
  }
  loadTransactions(wallwtId: string) {
    this.httpClient.get(this.basePath + "listTransactions/" + wallwtId).subscribe(
      (transactions: any) => {
        this.setTransactions(transactions.data);
        console.log(transactions.data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
