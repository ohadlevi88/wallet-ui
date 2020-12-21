import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DigitalWalletService } from './api-config';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 1;
  public appPages = [
    {
      title: 'Transactions',
      url: 'transactions',
      icon: 'archive',
    },
    {
      title: 'Wallets',
      url: 'wallets',
      icon: 'paper-plane'
    },
  ];

  public user = {
    userName: "Ohad Levi",
    userMail: "ohad@levi.com"
  }
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
    this.store.loadBalance(this.user.userMail);
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
  }
}
