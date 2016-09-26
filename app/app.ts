import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Home } from './pages/home/home';
import { WriteLetter } from './pages/write-letter/write-letter';
import { LoanOfficer } from './pages/loan-officer/loan-officer';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', icon: 'home', component: Home },
      { title: 'Write Letter', icon: 'document', component: WriteLetter },
      { title: 'Edit Profile', icon: 'person' , component: LoanOfficer },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
