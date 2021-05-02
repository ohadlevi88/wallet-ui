import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  fileUrl: any = null;
  respData: any;

  constructor(private transfer: FileTransfer) { }

  ngOnInit() {
  }
  cropUpload() {

  }

}
