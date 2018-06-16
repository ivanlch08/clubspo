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

  mensajeError:string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private aaaBackingProvider: AaaBackingBeanProvider,
    private modalCtrl: ModalController) {
      //this.listaDeportes = this.obtenerListaDeportes();
  }
  ionViewDidEnter() {
    
  }//ionViewDidEnter

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaGustoDeportivoPage');
    
    //CREACION DE LISTA POJO DEPORTE
    this.aaaBackingProvider.getAllDocuments('deportes').then(resultList => {
      resultList.forEach(element => {
        this.aaaBackingProvider.listaPojoDeporte.push({
          deporte: element, 
          seleccionado: false, 
          frecuencia: null,
          competitividad: null, 
          listaInteres : []
        });
      });
    });

  }//ionViewDidLoad

  async obtenerListaDeportes(){
    return await this.aaaBackingProvider.getAllDocuments('deportes');
  }//obtenerListaDeportes

  accionPopupDeporte(){
    let modal = this.modalCtrl.create(AaaPopupDeportePage);
    modal.present();
  }
  accionFrecuencia(){
    this.mensajeError = "";

    //VERIFICAR SI EL USUARIO SELECCIONÓ ALGUNA OPCIÓN
    let index = this.aaaBackingProvider.listaPojoDeporte.findIndex(obj => obj.seleccionado == true);
    if( index != -1 ){
      //se seleccionó al menos uno
      this.navCtrl.push(AaaFrecuenciaPage);
    }else{
      //no se ha seleccionado nada
      this.mensajeError = "Debes seleccionar al menos un deporte.";
    }
    
  }//accionFrecuencia

  recibirSeleccion(event){
    let index = this.aaaBackingProvider.listaPojoDeporte.findIndex(obj => obj.deporte.nombre == event.nombre);
    if( index != -1 ){
      this.aaaBackingProvider.listaPojoDeporte[index].seleccionado = event.seleccionado;
    }
  }//recibirSeleccion

  eliminarSeleccion(event){
    //let index = this.lista.findIndex(obj => obj.nombre == event.nombre);
    //this.lista.splice(index, 1);
  }

  trackByFn(index, item){
    return index;
  }

}//clase