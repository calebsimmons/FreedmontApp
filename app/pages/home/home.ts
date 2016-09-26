import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WriteLetter } from '../write-letter/write-letter';
import { LoanOfficer } from '../loan-officer/loan-officer';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class Home {
    writeLetterPage;
    editProfilePage;

    constructor(public navCtrl: NavController) {
        this.writeLetterPage = WriteLetter;
        this.editProfilePage = LoanOfficer;
    }

}
