import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../../pages/home/home';
import { LoginManagerProvider } from '../../providers/login-manager/login-manager';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
//para autenticacion con facebook
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-inicial',
  templateUrl: 'inicial.html',
})
export class InicialPage {

  userData = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth, 
    private toast: ToastController, 
    private loginManager: LoginManagerProvider, 
    private facebook:Facebook,
    public firebaseService: FirebaseServiceProvider 
  ) {
  }

  //ionViewDidLoad() {
  ionViewWillLoad() {
    
    /*console.log('VERIFICAR SI SE ENCUENTRA ALGUIEN AUTENTICADO');
    this.firebaseService.registrarLog('VERIFICAR SI SE ENCUENTRA ALGUIEN AUTENTICADO');
    this.afAuth.authState.subscribe(data => {
      this.firebaseService.registrarLog('info inicial: '+data);
      if(data && data.email && data.uid){
        this.toast.create({
          message: 'Bienvenido a Clubspo!, '+data.email+'!', 
          duration: 4000
        }).present();
        this.navCtrl.setRoot(InicialPage);
      }else{
        this.toast.create({
          message: 'No hay usuarios autenticados..', 
          duration: 4000
        }).present();
        //nav a autenticacion
        this.navCtrl.setRoot(HomePage);
      }
    }
    );*/
  }

  logout(){
    //verificar 
    //this.faceLogout();
    //ir a loginPage
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

  faceLogout(){
    this.facebook.logout().then(result => {
      this.toast.create({
        message: 'logout por facebook..', 
        duration: 4000
      }).present();
    });
  }//faceLogout

}//clase