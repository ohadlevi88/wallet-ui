import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  router:  Router, private store: StoreService) { }

  ngOnInit() {
  }
  login(form){
    this.store.loadWallet(form.value.id);
    this.router.navigateByUrl('wallets');
  }
}
