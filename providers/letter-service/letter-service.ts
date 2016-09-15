import { Injectable } from '@angular/core';

declare var pdfMake: any;


import { LoDataService } from '../../providers/lo-data-service/lo-data-service';
import { defineLetter } from './letter.ts';


@Injectable()
export class LetterService {
    loDataService: LoDataService = null;
    lo: any = {};

    constructor() {
        this.loDataService = new LoDataService();
        this.loDataService.loadData(this.lo);
    }

    openLetter(loan) {
        pdfMake.createPdf(defineLetter(loan, this.lo)).open();
    }

    getLetterBase64(loan) {
        var doc = defineLetter(loan, this.lo);
        return new Promise(function(resolve, reject) {
            pdfMake.createPdf(doc).getBase64(function(encodedString) {
                resolve(encodedString);
            });
        });
    }

    getLetterBuffer(loan) {
        var doc = defineLetter(loan, this.lo);
        return new Promise(function(resolve, reject) {
            pdfMake.createPdf(doc).getBuffer(function(buffer) {
                resolve(buffer);
            });
        });
    }

    getLetterBlob(buffer) {
        return new Promise(function(resolve, reject) {
            var blob = new Blob([buffer], {type: 'application/pdf'});
                resolve(blob);
        });
    }


}
