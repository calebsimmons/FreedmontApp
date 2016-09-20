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

    calculateBaseLoanAmmount() {
        console.log('fired calculateBaseLoanAmmount()');
        var ltv = parseFloat(this.loan.ltv) / 100;
        var sales = parseInt(this.loan.salesPrice);
        if (!isNaN(ltv) && !isNaN(sales)) {
            this.loan.baseLoanAmmount = (sales * ltv).toFixed(0).toString();
        }
    }

    calculateLTV() {
        console.log('fired calculateLTV()');
        var base = parseInt(this.loan.baseLoanAmmount);
        var sales = parseInt(this.loan.salesPrice);
        if (sales !== 0 && !isNaN(base) && !isNaN(sales)) {
            this.loan.ltv = (base / sales * 100).toString();
        }
    }

    calculateSalesPrice() {
        console.log('fired calculateSalesPrice()');
        var base = parseInt(this.loan.baseLoanAmmount);
        var ltv = parseFloat(this.loan.ltv) / 100;
        if (ltv !== 0 && !isNaN(ltv) && !isNaN(base)) {
            this.loan.salesPrice = (base / ltv).toFixed(0).toString();
        }
    }

    baseChanges() {
        console.log('baseLoanAmmount changed...');
        this.calculateLTV();
    }

    ltvChanges() {
        console.log('ltv changed...');
        this.calculateBaseLoanAmmount();
        this.calculateSalesPrice();
    }

    salesChanges() {
        console.log('salesPrices changed...');
        this.calculateBaseLoanAmmount();
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
