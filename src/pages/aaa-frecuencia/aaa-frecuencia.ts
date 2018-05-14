import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AaaNivelCompetitividadPage } from '../aaa-nivel-competitividad/aaa-nivel-competitividad';

@Component({
  selector: 'page-aaa-frecuencia',
  templateUrl: 'aaa-frecuencia.html',
})
export class AaaFrecuenciaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaFrecuenciaPage');
  }

  accionCompetitividad(){
    this.navCtrl.push(AaaNivelCompetitividadPage);
  }//accionCompetitividad

}//clase