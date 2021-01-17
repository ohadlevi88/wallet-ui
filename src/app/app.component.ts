import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StoreService } from './services/store.service';
import { Wallet } from './model/wallets';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 2;
  public appPages = [
    {
      title: 'Login',
      url: 'login',
      icon: 'person',
      selectedIndex: 0,
    },
    {
      title: 'Transactions',
      url: 'transactions',
      icon: 'archive',
      selectedIndex: 1
    },
    {
      title: 'Wallets',
      url: 'wallets',
      icon: 'paper-plane',
      selectedIndex: 2
    }
  ];

  wallet: Wallet;
  balance: number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: StoreService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.store.getWallet().subscribe((wallet: Wallet) => {
      if (!wallet) {
        return;
      }
      this.wallet = wallet;
    });
  }
}
