import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AaaFrecuenciaPage } from '../aaa-frecuencia/aaa-frecuencia';
import { AaaPopupDeportePage } from '../aaa-popup-deporte/aaa-popup-deporte';
import { Observable } from 'rxjs/Observable';
import { AaaBackingBeanProvider } from '../../providers/aaa-backing-bean/aaa-backing-bean';

@Component({
  selector: 'page-aaa-gusto-deportivo',
  templateUrl: 'aaa-gusto-deportivo.html',
})
export class AaaGustoDeportivoPage {

  listaDeportes: Observable<any[]>;
  texto: string = 'qwe';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private aaaBackingProvider: AaaBackingBeanProvider,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaGustoDeportivoPage');
    
    //cargar info del provider
    this.listaDeportes = this.aaaBackingProvider.listaDeportes;
    console.log('this.listaDeportes 1: '+this.listaDeportes.map.length);
    console.log('this.listaDeportes 2: '+this.listaDeportes);
  }

  accionPopupDeporte(){
    let modal = this.modalCtrl.create(AaaPopupDeportePage);
    modal.present();
  }
  accionFrecuencia(){
    this.navCtrl.push(AaaFrecuenciaPage);
  }//accionFrecuencia

}//clase