import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DigitalWalletService, WalletBalance } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  balance = new BehaviorSubject<WalletBalance>(null);
  balance$ = this.balance.asObservable();

  constructor(private digitalWalletService: DigitalWalletService) { }

  setBalance(balance: WalletBalance) {
    this.balance.next(balance);
  }

  getBalance() {
    return this.balance$;
  }

  loadBalance(userMail:string) {
    this.digitalWalletService.getBalance(userMail).subscribe(
      userBalance => {
        this.setBalance(userBalance);
      },
      err => {
        console.log(err);
      }
    );
  }

}
