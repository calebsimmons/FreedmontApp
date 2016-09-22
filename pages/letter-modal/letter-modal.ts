import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { LetterService } from '../../providers/letter-service/letter-service';

@Component({
    templateUrl: 'build/pages/letter-modal/letter-modal.html',
    directives: [PdfViewerComponent],
    providers: [LetterService]
})

export class LetterModal {
    letter: any = {};
    loan: any = {};

    constructor(
        public navCtrl: NavController,
        public params: NavParams,
        public letterService: LetterService
    ) {
        this.letter = {
            url: this.params.get('url'),
        };
        this.loan = this.params.get('loan');
    }

    dismissModal() {
        this.navCtrl.pop();
    }

    emailPdf() {
        this.letterService.getLetterBuffer(this.loan).then( buffer => {
            return this.letterService.getLetterBlob(buffer);
         }).then( blob => {
            return this.letterService.emailBlobAsFile(blob);
        });

    }
}
