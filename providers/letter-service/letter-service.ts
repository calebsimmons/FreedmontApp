import { Injectable } from '@angular/core';
import { File, EmailComposer } from 'ionic-native';

import { LoDataService } from '../../providers/lo-data-service/lo-data-service';

// Class method found in './defineLetter.ts'
import { defineLetter } from './defineLetter.ts';

// declare vars to ignore unsupported typescript debuging
declare var pdfMake: any;
declare var cordova: any;

const fs: string = cordova.file.tempDirectory;


@Injectable()
export class LetterService {
    loDataService: LoDataService = null;
    lo: any = {};

    constructor() {
        this.loDataService = new LoDataService();
        this.loDataService.loadData(this.lo);
        EmailComposer.isAvailable().then((available: boolean) => {
            if (available) {
                // Now we know we can send
            }
        });
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

    getLetterUrl(loan) {
        var doc = defineLetter(loan, this.lo);
        return new Promise(function(resolve, reject) {
            pdfMake.createPdf(doc).getDataUrl(function(url) {
                resolve(url);
            });
        });
    }

    getLetterBlob(buffer) {
        return new Promise(function(resolve, reject) {
            var blob = new Blob([buffer], {type: 'application/pdf'});
                resolve(blob);
        });
    }

    saveBlobToFile(blob) {
        return new Promise(function(resolve, reject) {
            File.writeFile(fs, 'letter.pdf', blob, true);
                resolve(fs + '/letter.pdf');
        });
    }

    emailPdf(filePath) {
        return new Promise(function(resolve, reject) {

            let email = {
                attachments: [ filePath ]
            };

            EmailComposer.open(email);

        });
    }
}
