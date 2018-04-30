import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';



@Injectable()
export class LoginManagerProvider {

  constructor() {
    console.log('Hello LoginManagerProvider Provider');
  }

  logout(){
    //this.navCtrl.setRoot(HomePage);
  }//logout
  
}