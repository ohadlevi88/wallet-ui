import { Injectable } from '@angular/core';
import * as BlinkID from '@microblink/blinkid-capacitor';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class OnboardingService {

    Results: string;
    DocumentFront: string;
    DocumentBack: string;
    DocumentFace: string;

    constructor(private alertController: AlertController) {
    }

    async scan() {

        // Initialize plugin
        const plugin = new BlinkID.BlinkIDPlugin();

        // Initialize wanted recognizer
        const blinkIdCombinedRecognizer = new BlinkID.BlinkIdCombinedRecognizer();
        blinkIdCombinedRecognizer.returnFullDocumentImage = true;
        blinkIdCombinedRecognizer.returnFaceImage = true;

        const licenseKeys: BlinkID.License = {
            ios: 'sRwAAAEMaW8ud2FsbGV0LnVpAE53ORms8u1Jjw1A/UqmcQUiMmmdzc9OPPlBH9BrYZUHr0Ae/yZBKsPTL6bI2c8pxuxz50VbDB4qMtQ6ScLnntEWrSteOzs0oUA9F9rn0T0l3HUeKRhzrwyqZIHOxLnqxf/aUvzjRtpCuGZeqaRABs5Lu2DsAbrz4abcIk4TpBlOBk+l94LObTDPYPnrGkO4BZNZglAA9Qc/k5aqq/BF/GgJYBhSOPK+3B7s7iUyBvH1gVgvH4YCGzE4JLULkApwRsx+TSVhxmOosymHi7N344KlkaAXMkzhV5xw2S9/Y0VKuNwhnxObWbRWj5Lme0nR48IAnz8LjNC3mXpUGdyWM1uB/UqmcQUiMmmdzc9OPPlBH9BrYZUHr0Ae/yZBKsPTL6bI2c8pxuxz50VbDB4qMtQ6ScLnntEWrSteOzs0oUA9F9rn0T0l3HUeKRhzrwyqZIHOxLnqxf/aUvzjRtpCuGZeqaRABs5Lu2DsAbrz4abcIk4TpBlOBk+l94LObTDPYPnrGkO4BZNZglAA9Qc/k5aqq/BF/GgJYBhSOPK+3B7s7iUyBvH1gVgvH4YCGzE4JLULkApwRsx+TSVhxmOosymHi7N344KlkaAXMkzhV5xw2S9/Y0VKuNwhnxObWbRWj5Lme0nR48IAnz8LjNC3mXpUGdyWM1uB',
            android: 'sRwAAAAMaW8ud2FsbGV0LnVp0V4SLyt9rVM+JIHd31t15FW8WPMm16c5ujJXKouovzy+RCapQydlgfeV043FMM0HWjGPpQp2SJ6Diae6VcHCtp1ycW0xzIWc8zvsrXZCdMIlKI7AFDI1FgmcY5AhIWMwMMJcTokTI9xmL7eFlVRo1fF1FQTa74+n3bWyN1ZN00Z2G7zDfjDBAoiZY3U50GD4jStktIvAHVzaxyPlevrymk/VZvTV/q5l4RaHomQ/sApH2lkVklVvBC9FPIDHsWvr2TctCXKzpOHezD9ImYzrcbnTFNwRbrdJRfuym8yxHb30WevnNqDZtQAZK8Jr48N67l+WiOkoLjXFziO4J6O8X3xd/UqmcQUiMmmdzc9OPPlBH9BrYZUHr0Ae/yZBKsPTL6bI2c8pxuxz50VbDB4qMtQ6ScLnntEWrSteOzs0oUA9F9rn0T0l3HUeKRhzrwyqZIHOxLnqxf/aUvzjRtpCuGZeqaRABs5Lu2DsAbrz4abcIk4TpBlOBk+l94LObTDPYPnrGkO4BZNZglAA9Qc/k5aqq/BF/GgJYBhSOPK+3B7s7iUyBvH1gVgvH4YCGzE4JLULkApwRsx+TSVhxmOosymHi7N344KlkaAXMkzhV5xw2S9/Y0VKuNwhnxObWbRWj5Lme0nR48IAnz8LjNC3mXpUGdyWM1uB',
            showTrialLicenseWarning: true
        };

        // Perform scan and gather results
        const scanningResults = await plugin.scanWithCamera(
            new BlinkID.BlinkIdOverlaySettings(),
            new BlinkID.RecognizerCollection([blinkIdCombinedRecognizer]),
            licenseKeys
        );
        if (scanningResults.length === 0) {
            return;
        }

        for (const result of scanningResults) {
            if (result instanceof BlinkID.BlinkIdCombinedRecognizerResult) {
                //this.Results = this.getIdResultsString(result);
                this.DocumentFront = result.fullDocumentFrontImage ? `data:image/jpg;base64,${result.fullDocumentFrontImage}` : undefined;
                this.DocumentBack = result.fullDocumentBackImage ? `data:image/jpg;base64,${result.fullDocumentBackImage}` : undefined;
                this.DocumentFace = result.faceImage ? `data:image/jpg;base64,${result.faceImage}` : undefined;
                return result;
            }
            // const alert = await this.alertController.create({
            //     cssClass: 'my-custom-class',
            //     header: 'Wallet-UI',
            //     subHeader: 'For your information:',
            //     message: `${this.Results}`,
            //     buttons: ['OK']
            // });

            // await alert.present();
        }
    }

    getIdResultsString(result: BlinkID.BlinkIdCombinedRecognizerResult) {
        return this.buildResult(result.firstName, 'First name') +
            this.buildResult(result.lastName, 'Last name') +
            this.buildResult(result.fullName, 'Full name') +
            this.buildResult(result.localizedName, 'Localized name') +
            this.buildResult(result.additionalNameInformation, 'Additional name info') +
            this.buildResult(result.address, 'Address') +
            this.buildResult(
                result.additionalAddressInformation, 'Additional address info') +
            this.buildResult(result.documentNumber, 'Document number') +
            this.buildResult(
                result.documentAdditionalNumber, 'Additional document number') +
            this.buildResult(result.sex, 'Sex') +
            this.buildResult(result.issuingAuthority, 'Issuing authority') +
            this.buildResult(result.nationality, 'Nationality') +
            this.buildDateResult(result.dateOfBirth, 'Date of birth') +
            this.buildIntResult(result.age, 'Age') +
            this.buildDateResult(result.dateOfIssue, 'Date of issue') +
            this.buildDateResult(result.dateOfExpiry, 'Date of expiry') +
            this.buildResult(result.dateOfExpiryPermanent.toString(),
                'Date of expiry permanent') +
            this.buildResult(result.maritalStatus, 'Martial status') +
            this.buildResult(result.personalIdNumber, 'Personal Id Number') +
            this.buildResult(result.profession, 'Profession') +
            this.buildResult(result.race, 'Race') +
            this.buildResult(result.religion, 'Religion') +
            this.buildResult(result.residentialStatus, 'Residential Status') +
            this.buildDriverLicenceResult(result.driverLicenseDetailedInfo);
    }

    getMrzResultsString(result: BlinkID.MrtdCombinedRecognizerResult) {
        const mrzResult = result.mrzResult;
        return this.buildResult(mrzResult.primaryId, 'Primary ID') +
            this.buildResult(mrzResult.secondaryId, 'Secondary ID') +
            this.buildResult(mrzResult.gender, 'Gender') +
            this.buildResult(mrzResult.issuer, 'Issuer') +
            this.buildResult(mrzResult.nationality, 'Nationality') +
            this.buildDateResult(mrzResult.dateOfBirth, 'Date of birth') +
            this.buildIntResult(mrzResult.age, 'Age') +
            this.buildDateResult(mrzResult.dateOfExpiry, 'Date of expiry') +
            this.buildResult(mrzResult.documentCode, 'Document code') +
            this.buildResult(mrzResult.documentType, 'Document type') +
            this.buildResult(mrzResult.opt1, 'Optional 1') +
            this.buildResult(mrzResult.opt2, 'Optional 2') +
            this.buildResult(mrzResult.mrzText, 'MRZ Text');
    }

    buildResult(result, key) {
        if (result && result !== '') {
            return `${key}: ${result}\n`;
        }
        return '';
    }

    buildDateResult(result, key) {
        if (result && result.year !== 0) {
            return this.buildResult(`${result.day}.${result.month}.${result.year}`, key);
        }
        return '';
    }

    buildIntResult(result, key) {
        if (result >= 0) {
            return this.buildResult(result.toString(), key);
        }
        return '';
    }

    buildDriverLicenceResult(result) {
        if (result) {
            return this.buildResult(result.restrictions, 'Restrictions') +
                this.buildResult(result.endorsements, 'Endorsements') +
                this.buildResult(result.vehicleClass, 'Vehicle class') +
                this.buildResult(result.conditions, 'Conditions');
        }
        return '';
    }
}
