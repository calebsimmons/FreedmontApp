import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoDataService } from '../../providers/lo-data-service/lo-data-service';

@Component({
    templateUrl: 'build/pages/loan-officer/loan-officer.html',
    providers: [LoDataService]
})

export class LoanOfficer {

    public lo: any = {};

    constructor(private navCtrl: NavController, public loDataService: LoDataService) {

    }

    logData() {
        console.log(this.lo);
    }

    saveData() {
        this.loDataService.saveData(this.lo);
    }

    private loadData() {
        this.loDataService.loadData(this.lo);
    }

    ionViewLoaded() {
        this.loadData();
        console.log(this.lo);
    }

    ionViewWillLeave() {
        this.saveData();
    }


}
