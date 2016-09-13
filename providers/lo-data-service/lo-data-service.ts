import { Storage, SqlStorage } from 'ionic-angular';
import { Injectable } from '@angular/core';



@Injectable()
export class LoDataService {
    storage: Storage = null;
    constructor() {
        this.storage = new Storage(SqlStorage);
        this.storage.query(`CREATE TABLE IF NOT EXISTS loanOfficer (id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT,
            lastName TEXT,
            addressOne TEXT,
            addressTwo TEXT,
            city TEXT,
            state TEXT,
            zipCode TEXT,
            email TEXT,
            officePhone TEXT,
            cellPhone TEXT,
            nmlsNumber TEXT
        )`);

        this.storage.query(`SELECT * FROM loanOfficer WHERE id = 1`).then((response) => {
            var rowsFound = response.res.rows.length;
            console.log(rowsFound + ' rows found');
            if (rowsFound === 0) {
                console.log('creating blank record ... ');
                this.storage.query('INSERT INTO loanOfficer DEFAULT VALUES');
            }
        });
    }

    public saveData(lo) {

        // render SQL statement by iterating over values that exist
        let sql: string = `UPDATE loanOfficer SET `;
        for (var key in lo) {
            sql += `${key} = "${lo[key]}",`;
        }
        sql = sql.slice(0, -1); // remove trailing comma on last iteration
        sql += ` WHERE id = 1`;

        console.log(sql);
        this.storage.query(sql);
    }

    public loadData(lo) {
        return this.storage.query('SELECT * FROM loanOfficer').then( data => {
            if (data.res.rows.length > 0) {
                let item = data.res.rows.item(0);
                for (var key in item) {
                    if (item[key] != null) {
                        lo[key] = item[key];
                    }
                }
            }
        });
    }

}
