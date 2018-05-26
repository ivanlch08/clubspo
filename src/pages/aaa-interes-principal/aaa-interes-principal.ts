import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AaaBackingBeanProvider } from '../../providers/aaa-backing-bean/aaa-backing-bean';

@Component({
  selector: 'page-aaa-interes-principal',
  templateUrl: 'aaa-interes-principal.html',
})
export class AaaInteresPrincipalPage {

  public listaSeleccionados: any[];
  public listaOpciones: Promise<any[]>;

  constructor(
    public navCtrl: NavController, 
    private aaaBackingProvider: AaaBackingBeanProvider, 
    public navParams: NavParams) {
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaInteresPrincipalPage');

    //OBTENER DE LA LISTA DE POJOS, TODOS LOS SELECCIONADOS EN LA VISTA PREVIA
    this.listaSeleccionados = [];
    this.aaaBackingProvider.listaPojoDeporte.forEach(element => {
      if( element.seleccionado == true ){
        this.listaSeleccionados.push(element);
      }
    });
    console.log('this.listaSeleccionados1: '+this.listaSeleccionados);
    console.log('this.listaSeleccionados2: '+ JSON.stringify(this.listaSeleccionados) );
    this.listaOpciones = this.obtenerListaIntereses();
  }//ionViewDidLoad

  async obtenerListaIntereses(){
    return await this.aaaBackingProvider.getAllDocuments('deporteInteres');
  }//obtenerListaDeportes

  trackByFn(index, item){
    return index;
  }//trackByFn

}//clase