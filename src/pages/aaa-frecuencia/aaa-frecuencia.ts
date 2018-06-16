import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AaaNivelCompetitividadPage } from '../aaa-nivel-competitividad/aaa-nivel-competitividad';
import { AaaBackingBeanProvider } from '../../providers/aaa-backing-bean/aaa-backing-bean';

@Component({
  selector: 'page-aaa-frecuencia',
  templateUrl: 'aaa-frecuencia.html',
})
export class AaaFrecuenciaPage {

  mensajeError: string = "";
  
  public listaSeleccionados: any[];
  public listaOpciones: Promise<any[]>;

  constructor(
    public navCtrl: NavController, 
    private aaaBackingProvider: AaaBackingBeanProvider, 
    public navParams: NavParams) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaFrecuenciaPage');
    //obtener la lista de deportes seleccionados del backingBean
    //this.listaSeleccionados = this.aaaBackingProvider.listaDeportesSeleccionados;
    
    //v2
    //OBTENER DE LA LISTA DE POJOS, TODOS LOS SELECCIONADOS EN LA VISTA PREVIA
    this.listaSeleccionados = [];
    this.aaaBackingProvider.listaPojoDeporte.forEach(element => {
      if( element.seleccionado == true ){
        this.listaSeleccionados.push(element);
      }
    });

    this.listaOpciones = this.obtenerListaFrecuencias();
  }//ionViewDidLoad
  
  async obtenerListaFrecuencias(){
    return await this.aaaBackingProvider.getAllDocuments('deporteRegularidad');
  }//obtenerListaDeportes

  frecuenciaSeleccionada(event){
    console.log('frecuenciaSeleccionada: '+event);
    //iterar la lista para encontrar el registro y colocarle la opcion seleccionada
    let index = this.listaSeleccionados.findIndex(obj => obj.deporte.nombre == event.nombre);
    if(index != -1){//si es -1, elimina el ultimo
      this.listaSeleccionados[index].frecuencia = event.seleccion;
    }
    //colocarla tambien en la lista del backingbean
    let index2 = this.aaaBackingProvider.listaPojoDeporte.findIndex(obj => obj.deporte.nombre == event.nombre);
    if(index2 != -1){
      this.aaaBackingProvider.listaPojoDeporte[index2].frecuencia = event.seleccion;
    }
  }//frecuenciaSeleccionada

  eliminarDeporte(event){
    console.log('eliminar dep: '+event);
    //eliminar de la lista de esta vista
    let index = this.listaSeleccionados.findIndex(obj => obj.deporte.nombre == event);
    if(index != -1){//si es -1, elimina el ultimo
      this.listaSeleccionados.splice(index, 1);
    }

    //eliminar de la lista del backingBean
    let index2 = this.aaaBackingProvider.listaPojoDeporte.findIndex(obj => obj.deporte.nombre == event);
    if(index2 != -1){
      this.aaaBackingProvider.listaPojoDeporte[index2].seleccionado = false;
    }
  }//eliminarDeporte
  
  trackByFn(index, item){
    return index;
  }

  accionCompetitividad(){
    //VALIDAR SI SE SELECCIONÓ ALGUNO
    let error: boolean = false;

    this.listaSeleccionados.forEach(element => {
      if( element.frecuencia == null ){
        error = true;
      }
    });

    if( error ){
      //no se ha seleccionado nada
      this.mensajeError = "Debes seleccionar una opción para cada deporte.";
    }else{
      this.navCtrl.push(AaaNivelCompetitividadPage);
    }
    
  }//accionCompetitividad

}//clase