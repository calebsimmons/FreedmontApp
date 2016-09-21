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
        baseLoanAmount: '',
        totalLoanAmount: ''
    };

    constructor(
        public navCtrl: NavController,
        public letterService: LetterService
    ) {}

    calculateBaseLoanAmount() {
        console.log('fired calculateBaseLoanAmount()');
        var ltv = parseFloat(this.loan.ltv) / 100;
        var sales = parseInt(this.loan.salesPrice);
        if (!isNaN(ltv) && !isNaN(sales)) {
            this.loan.baseLoanAmount = (sales * ltv).toFixed(0).toString();
        }
    }

    calculateLTV() {
        console.log('fired calculateLTV()');
        var base = parseInt(this.loan.baseLoanAmount);
        var sales = parseInt(this.loan.salesPrice);
        if (sales !== 0 && !isNaN(base) && !isNaN(sales)) {
            this.loan.ltv = (base / sales * 100).toString();
        }
    }

    calculateSalesPrice() {
        console.log('fired calculateSalesPrice()');
        var base = parseInt(this.loan.baseLoanAmount);
        var ltv = parseFloat(this.loan.ltv) / 100;
        if (ltv !== 0 && !isNaN(ltv) && !isNaN(base)) {
            this.loan.salesPrice = (base / ltv).toFixed(0).toString();
        }
    }

    calculateTotalLoanAmount() {
        console.log('fired calculateTotalLoanAmount()');
        var base = parseInt(this.loan.baseLoanAmount);
        if (this.loan.program === 'FHA' && !isNaN(base)) {
            this.loan.totalLoanAmount = (base * (1 + (1.75 / 100))).toFixed(0).toString();
        } else {
            this.loan.totalLoanAmount = this.loan.baseLoanAmount;
        }
    }

    baseChanges() {
        console.log('baseLoanAmount changed...');
        this.calculateLTV();
        this.calculateTotalLoanAmount();
    }

    ltvChanges() {
        console.log('ltv changed...');
        this.calculateBaseLoanAmount();
        this.calculateSalesPrice();
        this.calculateTotalLoanAmount();
    }

    salesChanges() {
        console.log('salesPrices changed...');
        this.calculateBaseLoanAmount();
        this.calculateTotalLoanAmount();
    }

    programChanges() {
        console.log('program changes...');
        this.calculateTotalLoanAmount();
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
