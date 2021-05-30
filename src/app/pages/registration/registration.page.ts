import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AlertController } from '@ionic/angular';
import { OnboardingService } from 'src/app/services/onboarding.service';
import * as BlinkID from '@microblink/blinkid-capacitor';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  fileUrl: any = null;
  respData: any;
  registrationForm: FormGroup;

  constructor(private alertController: AlertController, private onboardingService: OnboardingService, private fb: FormBuilder) { }

  ngOnInit() {
    this.setRegistrationForm();
  }
  setRegistrationForm() {
    this.registrationForm = this.fb.group({
      personalIdNumber: [''],
      firstName: [''],
      lastName: [''],
      dateOfBirth: ['']
    })
  }
  scan() {
    this.onboardingService.scan().then((results: BlinkID.BlinkIdCombinedRecognizerResult) => {
      this.setResultsIntoForm(results);
    });
  }
  async setResultsIntoForm(results: BlinkID.BlinkIdCombinedRecognizerResult) {
    this.registrationForm.get("personalIdNumber").setValue(results.personalIdNumber.replace('ID', ''));
    this.registrationForm.get("firstName").setValue(results.firstName);
    this.registrationForm.get("lastName").setValue(results.lastName);
    this.registrationForm.get("dateOfBirth").setValue(`${results.dateOfBirth.day}.${results.dateOfBirth.month}.${results.dateOfBirth.year}`);
  }
}
