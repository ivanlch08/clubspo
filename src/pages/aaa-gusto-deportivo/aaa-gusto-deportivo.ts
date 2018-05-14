import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AaaFrecuenciaPage } from '../aaa-frecuencia/aaa-frecuencia';
import { AaaPopupDeportePage } from '../aaa-popup-deporte/aaa-popup-deporte';

@Component({
  selector: 'page-aaa-gusto-deportivo',
  templateUrl: 'aaa-gusto-deportivo.html',
})
export class AaaGustoDeportivoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaGustoDeportivoPage');
  }

  accionPopupDeporte(){
    let modal = this.modalCtrl.create(AaaPopupDeportePage);
    modal.present();
  }
  accionFrecuencia(){
    this.navCtrl.push(AaaFrecuenciaPage);
  }//accionFrecuencia

}//clase