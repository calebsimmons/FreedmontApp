import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LetterService } from '../../providers/letter-service/letter-service';

@Component({
    templateUrl: 'build/pages/write-letter/write-letter.html',
    providers: [ LetterService ]
})
export class WriteLetter {
    public letterBase64: any = {};
    public letterBuffer: any = {};
    public letterBlob: any = {};
    public loan: any = {
        borrowerName: '',
        program: '',
        term: '',
        rateType: '',
        salesPrice: '',
        baseLoanAmmount: ''
    };

    constructor(
        public navCtrl: NavController,
        public letterService: LetterService
    ) {}

    calculateBase() {
        var ltv: number = parseFloat(this.loan.ltv) / 100;
        var salesPrice: number = parseInt(this.loan.salesPrice);
        console.log(salesPrice * ltv);
        this.loan.baseLoanAmmount = (salesPrice * ltv).toString();
    }


    logData() {
        console.log(this.loan);
    }

    openLetter() {
        this.letterService.openLetter(this.loan);
    }

    getLetterBase64() {
        this.letterService.getLetterBase64(this.loan).then( encodedString => {
            this.letterBase64 = encodedString;
            console.log(this.letterBase64);
        });
    }

    getLetterBuffer() {
        this.letterService.getLetterBuffer(this.loan).then( buffer => {
            this.letterBuffer = buffer;
            console.log(this.letterBuffer);
        });
    }

    getLetterBlob() {
        this.letterService.getLetterBuffer(this.loan).then( buffer => {
            this.letterBuffer = buffer;
            console.log(this.letterBuffer);
            return this.letterService.getLetterBlob(buffer);
        }).then( blob => {
            this.letterBlob = blob;
            console.log(this.letterBlob);
        });
    }

    emailPdf() {
        this.letterService.getLetterBuffer(this.loan).then( buffer => {
            this.letterBuffer = buffer;
            console.log(this.letterBuffer);
            return this.letterService.getLetterBlob(buffer);
         }).then( blob => {
            this.letterBlob = blob;
            console.log(this.letterBlob);
            return this.letterService.emailBlobAsFile(blob);
        });
    }

}
