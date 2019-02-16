import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase'; 

var config = {
  apiKey: "AIzaSyBzJnWf-KlIDmn-_85fwmrl35BJUN1Pgy0",
  authDomain: "pokemon-b1b27.firebaseapp.com",
  databaseURL: "https://pokemon-b1b27.firebaseio.com",
  projectId: "pokemon-b1b27",
  storageBucket: "",
  messagingSenderId: "934452340257"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
