import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {

  constructor(public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async invite(form) {
    const alert = await this.alertController.create({
      cssClass: 'invite_alert',
      header: 'Invitation',
      subHeader: 'To: ' + form.value.firstName + " " + form.value.lastName,
      message: 'The invitation has been sent',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            form.resetForm();
            this.router.navigateByUrl('transactions');
          }
        }
      ]
    });
    await alert.present();
  }

}
