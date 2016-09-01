import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoDataService } from '../../providers/lo-data-service/lo-data-service';

/*
  Generated class for the LoanOfficerPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/loanOfficer/loanOfficer.html',
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
        this.loDataService.getData().then(
            data => {
                if (data.res.rows.length > 0) {
                    let item = data.res.rows.item(0);
                    for (var key in item) {
                        if (item[key] != null) {
                            this.lo[key] = item[key];
                        }
                    }
                }
            }
        );
    }

    ionViewLoaded() {
        this.loadData();
        console.log(this.lo);
    }

    ionViewWillLeave() {
        this.saveData();
    }


}
