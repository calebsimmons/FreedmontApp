import { Injectable } from '@angular/core';
import { File, SocialSharing} from 'ionic-native';
import { Platform } from 'ionic-angular';

import { LoDataService } from '../../providers/lo-data-service/lo-data-service';
// Class method found in './defineLetter.ts'
import { defineLetter } from './defineLetter.ts';

// declare vars to ignore unsupported typescript debuging
declare var pdfMake: any;
declare var cordova: any;

@Injectable()
export class LetterService {
    loDataService: LoDataService = null;
    lo: any = {};
    os: any = {};

    constructor(public platform: Platform) {
        this.platform = platform;
        this.loDataService = new LoDataService();
        this.loDataService.loadData(this.lo);
        if ( this.platform.is('mobile') ) {

            if ( this.platform.is('ios') ) {
                this.os = 'ios';
            }

            if ( this.platform.is('android') ) {
                this.os = 'android';
            }
        }
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

    emailBlobAsFile(blob) {
        var os = this.os;    
        return new Promise(function(resolve, reject) {

            if (os == 'ios') {
                var fs = cordova.file.tempDirectory;
                console.log(fs);
            }

            if (os == 'android') {
                var fs = cordova.file.externalCacheDirectory;
                console.log(fs);
            }

            File.createFile(fs, 'letter.pdf', true).then( resolve => {
                console.log('file created');
                return File.writeFile(fs, 'letter.pdf', blob, true);
            }).then(() => {
                // Check if sharing via email is supported
                SocialSharing.canShareViaEmail().then(() => {
                  console.log('Sharing via email is possible');
                }).catch(() => {
                  console.log('Sharing via email is not possible');
                });

                // Share via email
                SocialSharing.shareViaEmail(
                    'See attached...', // body
                    'Your Prequalification Letter', // subject
                    [], // to:
                    [], // cc:
                    [], // bcc:
                    // Array for files to attach
                    [fs + 'letter.pdf']
                ).then(() => {
                  console.log('Email sent!');
                }).catch(() => {
                  console.log('Email not sent ...');
                });
            });
        });
    }

}
