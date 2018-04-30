import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../../pages/home/home';
import { LoginManagerProvider } from '../../providers/login-manager/login-manager';

@Component({
  selector: 'page-inicial',
  templateUrl: 'inicial.html',
})
export class InicialPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth, 
    private toast: ToastController, 
    private loginManager: LoginManagerProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('VERIFICAR SI SE ENCUENTRA ALGUIEN AUTENTICADO');

    this.afAuth.authState.subscribe(data => {
      console.log(data);
      if(data && data.email && data.uid){
        this.toast.create({
          message: 'Bienvenido a APP_NAME!, ${data.email}!', 
          duration: 4000
        }).present();
      }else{
        this.toast.create({
          message: 'No hay información de autenticación', 
          duration: 4000
        }).present();
        //nav a autenticacion

      }
    }
    );
  }

  logout(){
    this.navCtrl.setRoot(HomePage);
  }
}//clase