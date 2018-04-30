import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { RegistroPage } from '../registro/registro';
import { InicialPage } from '../inicial/inicial';
import { User } from '../../models/user';

@Component({
  selector: 'page-cuentaPropia',
  templateUrl: 'cuentaPropia.html'
})
export class CuentaPropiaPage {

  user = {} as User;
  mensajeLog = "" as string;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) {

  }

  async accionLogin(user: User){
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result){
        this.navCtrl.setRoot(InicialPage);
      }
    }catch(e){
      console.error(e);
      this.mensajeLog = "Se presentó un error realizando la autenticación.";
    }
  }//accionLogin

  irRegistro(){
    this.navCtrl.push(RegistroPage);
  }
}
