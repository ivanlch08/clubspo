import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AaaInteresPrincipalPage } from '../aaa-interes-principal/aaa-interes-principal';

@Component({
  selector: 'page-aaa-nivel-competitividad',
  templateUrl: 'aaa-nivel-competitividad.html',
})
export class AaaNivelCompetitividadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaNivelCompetitividadPage');
  }

  accionInteresPrincipal(){
    this.navCtrl.push(AaaInteresPrincipalPage);
  }//accionInteresPrincipal

}//clase