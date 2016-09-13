import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LetterService } from '../../providers/letter-service/letter-service';


@Component({
    templateUrl: 'build/pages/write-letter/write-letter.html',
    providers: [ LetterService ]
})
export class WriteLetter {
    public letterUrl: any = {};
    public loan: any = {
        borrowerName: "",
        program: "",
        term: "",
        rateType: "",
        salesPrice: "",
        baseLoanAmmount: ""
    };

    constructor(
        public navCtrl: NavController,
        public letterService: LetterService
    ) {}


    logData() {
        console.log(this.loan);
    }

    openLetter() {
        this.letterService.openLetter(this.loan);
    }

    displayLetterURL() {
        this.letterService.getLetterB64(this.loan).then( encodedString => {
            this.letterUrl = encodedString;
        });
        console.log(this.letterUrl);
    }

}
