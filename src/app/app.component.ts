import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { FCM } from '@ionic-native/fcm/ngx';

import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { FcmService } from './fcm.service';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';

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

  myKeyRegistration:string = "";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private push: Push,
    private fcm: FCM,
    private fcmService: FcmService,
    private storage: Storage,
    private localNotifications: LocalNotifications,
    private alertController: AlertController

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
    //this.fcm.subscribeToTopic('pokemon');

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Nuevo pokemon',
      message: 'Han creado un nuevo pokemon',
      buttons: ['OK']
    });

    await alert.present();
  }

  notificacion() {

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

    pushObject.on('notification').subscribe( (notification: any) => {
      let idSender = String(notification.additionalData.idSender);
      let myKeyRegistration = String(this.myKeyRegistration);

      if( idSender == myKeyRegistration ){
        console.log('Received a notification of me', notification);
      }
      else{
        console.log('Received a notification of other device', notification);
        this.presentAlert();
        this.localNotifications.schedule({
          id: 1,
          text: 'Pokemon creado',
          data: { msg: "Se ha creado un nuevo pokemon" }
        }); 
      }
      }
    );

    pushObject.on('registration').subscribe((registration: any) => 
    {
      this.fcmService.subscribeTopic(registration.registrationId).subscribe( response => {
        this.myKeyRegistration = registration.registrationId;
        this.storage.set('keyRegistration', this.myKeyRegistration);
        console.log("Suscrito: "  + this.myKeyRegistration);
      })
      console.log('Device registered', registration)
    }
    );

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}