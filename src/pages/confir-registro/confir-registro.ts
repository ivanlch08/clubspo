import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CuentaPropiaPage } from '../cuentaPropia/cuentaPropia';

@Component({
  selector: 'page-confir-registro',
  templateUrl: 'confir-registro.html',
})
export class ConfirRegistroPage {

  constructor(public navCtrl: NavController) {
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirRegistroPage');
  }*/
  
  irCuentaPropia(){
    this.navCtrl.push(CuentaPropiaPage);
  }//irCuentaPropia

}