import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LetterService } from '../../providers/letter-service/letter-service';

@Component({
    templateUrl: 'build/pages/letter-modal/letter-modal.html',
})

export class LetterModal {

    constructor(
        private navCtrl: NavController,
        public letterService: LetterService
    ) {}

    dismissModal() {
        this.navCtrl.pop();
    }

}
