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

  //listaDeportes: Observable<any[]>;
  listaDeportes: Promise<any[]>;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private aaaBackingProvider: AaaBackingBeanProvider,
    private modalCtrl: ModalController) {
      this.listaDeportes = this.obtenerListaDeportes();
  }
  ionViewDidEnter() {
    
  }//ionViewDidEnter

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaGustoDeportivoPage');
    
    //cargar info del provider
    //v1
    //this.listaDeportes = this.aaaBackingProvider.listaDeportes;
    //v2
    //this.aaaBackingProvider.getAllDocuments('deportes').then(result => {
      //this.listaDeportes = result;
    //});
    //v3
    //this.listaDeportes = this.obtenerListaDeportes();

  }//ionViewDidLoad

  async obtenerListaDeportes(){
    return await this.aaaBackingProvider.getAllDocuments('deportes');
  }//obtenerListaDeportes

  accionPopupDeporte(){
    let modal = this.modalCtrl.create(AaaPopupDeportePage);
    modal.present();
  }
  accionFrecuencia(){
    this.navCtrl.push(AaaFrecuenciaPage);
  }//accionFrecuencia

}//clase