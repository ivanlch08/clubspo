import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
//import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import  firebase  from 'firebase';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingItems: Observable<any[]>;
  newItem = '';

  userData = null;
  mensajeLog = '';
  constructor(public navCtrl: NavController, public firebaseService: FirebaseServiceProvider, private facebook:Facebook) {
    this.shoppingItems = this.firebaseService.getShoppingItems();
  }

  addItem(){
    this.firebaseService.addItem(this.newItem);
    this.newItem = '';
  }

  removeItem(id){
    console.log('eliminando item: '+id);
    this.firebaseService.removeItem(id);
  }

  loginFaceWeb(){
    console.log('login web..');
    this.firebaseService.registrarLog('login web.. 00');
    this.mensajeLog = 'inicio;';
    let provider = new firebase.auth.FacebookAuthProvider();
    this.firebaseService.registrarLog('login web.. 01');
    this.mensajeLog += '01;';
    try {
      firebase.auth().signInWithRedirect(provider).then(()=>{
        console.log('login 01');
        this.firebaseService.registrarLog('login web.. 02');
        firebase.auth().getRedirectResult().then((result)=>{
          console.log('login 02');
          this.firebaseService.registrarLog('login web.. 03');
          this.userData = { email: result['email'], first_name: result['first_name'], picture: result['picture_large']['data']['url'], username: result['name'] };
          this.mensajeLog = JSON.stringify(result);
          alert(JSON.stringify(result));
        }).catch(function(error){
          console.log('login error xx');
          this.firebaseService.registrarLog('login web.. XX');
          this.mensajeLog = JSON.stringify(error);
          alert(JSON.stringify(error));
        })
      });

    } catch (error) {
      console.log('error: '+JSON.stringify(error));
      this.firebaseService.registrarLog('login web.. XXX');
    }
    console.log('login fin');
    this.firebaseService.registrarLog('login web.. FIN');
  }//loginFaceWeb

  loginFaceApp(){
    var mensaje = '';
    this.firebaseService.registrarLog('login App.. 00');
    this.facebook.login(['email','public_profile']).then((response:FacebookLoginResponse) => {
      this.firebaseService.registrarLog('login App.. 01');
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] };
      })
    }).catch(function(error){
      mensaje += 'login App.. ERROR;';
      //mensaje += JSON.stringify(error);
    });
    this.firebaseService.registrarLog(mensaje);
    this.firebaseService.registrarLog('login App.. 02');
  }//loginFaceApp

  pruebaLog(){
    this.mensajeLog = '01;';
    this.mensajeLog += 'esta es una prueba de log';
  }

}//clase

