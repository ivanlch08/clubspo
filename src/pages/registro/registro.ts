import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { ConfirRegistroPage } from '../confir-registro/confir-registro'

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  user = {} as User;
  mensajeLog = "" as string;

  constructor(
    public navCtrl: NavController, 
    public firebaseService: FirebaseServiceProvider, 
    private afAuth: AngularFireAuth) {

  }

  async accionRegistrar(user: User){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(result => {
        console.log(result);
        user.uid = result.uid;
        this.firebaseService.registrarUsuario(user);
        this.navCtrl.setRoot(ConfirRegistroPage);
      });
    }catch(e){
      console.error(e);
      this.mensajeLog = "Se presentó un error realizando el registro de usuario.";
    }

  }//accionRegistrar

}
