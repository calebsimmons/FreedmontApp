import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/writeLetter/writeLetter.html'
})
export class WriteLetter {

    public borrower: any = {};
    public loan: any = {};

    constructor(public navCtrl: NavController) {

    }

    logData() {
        console.log(this.borrower);
        console.log(this.loan);
    }



}
