import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase'; 

import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
var config = {
  apiKey: "AIzaSyD8ji6B5BfBa7I6mQ5KGMOfruu7dyBTyV0",
  authDomain: "tallerfirebase-6a4ab.firebaseapp.com",
  databaseURL: "https://tallerfirebase-6a4ab.firebaseio.com",
  projectId: "tallerfirebase-6a4ab",
  storageBucket: "tallerfirebase-6a4ab.appspot.com",
  messagingSenderId: "831981256313"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private push: Push
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
    this.notificacion();
  }

  notificacion(){
    const options: PushOptions = {
      android: {
        senderID: '831981256313'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
   }
   
   const pushObject: PushObject = this.push.init(options);
   
   
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   
   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
   
  }
}
