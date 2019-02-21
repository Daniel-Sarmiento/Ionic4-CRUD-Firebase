import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FcmService } from '../fcm.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pokemons: any[]
  pushObject: any;
  keyRegistration:any;
  //ref = firebase.database().ref('pokemon-b1b27')
  ref = firebase.database().ref()


  constructor(private alert: AlertController,
    private router: Router,
    private alertController: AlertController,
    private fcmService: FcmService,
    private storage: Storage
  ) {
    //listar pokemones
    this.ref.on('value', response => {
      let datos = snapshotToArray(response);
      this.pokemons = datos;
      console.log(response);
      console.log(datos);
    });

    this.storage.get('keyRegistration').then((val) => {
      this.keyRegistration = val;
      console.log('(1)Your keyRegistration is', this.keyRegistration);
    });

    /* //Insertar pokemones
    let insert = this.ref.push();
    insert.set({name: 'Pikachu2'}); */

    /* //Obtener pokemon
    firebase.database().ref('-LYbX8aWdi_QYPaThBLt').on('value', response => {
      let dato =  snapshotToObject(response);
      console.log(dato);
    }) */

    /* let data = {
      name: 'pichu'
    }

    //actualizar
    firebase.database().ref('-LYbTtEnXmJgwAi1S5qv').update(data); */

  }

  delete(pokemon: any) {
    console.log(pokemon);
    firebase.database().ref(pokemon.key).remove();
  }

  async add() {

    const alert = await this.alertController.create({
      header: 'Pokemon',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel')
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Ok', data)
            let insert = this.ref.push();
            insert.set(data);
            console.log('(2)Your keyRegistration is',this.keyRegistration);
            this.fcmService.sendNotification(this.keyRegistration).subscribe(response => {
              console.log("Notificación enviada: " + response);
            })
          }
        }
      ]
    })

    await alert.present();
    this.pushObject.on('notification', (data) => {
      console.log("Imprimiendo notificación de registro");

    })
  }

  async edit(pokemon: any) {
    const alert = await this.alertController.create({
      header: 'Pokemon',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: pokemon.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel')
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Ok', data)
            firebase.database().ref(pokemon.key).update(data);
          }
        }
      ]
    })
    await alert.present();
  }

  async click() {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  goUrl(): void {
    this.router.navigateByUrl('/perfil')
  }

}

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}

export const snapshotToArray = sanpshot => {
  let returnArr = [];

  sanpshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
}