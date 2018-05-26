import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AaaInteresPrincipalPage } from '../aaa-interes-principal/aaa-interes-principal';
import { AaaBackingBeanProvider } from '../../providers/aaa-backing-bean/aaa-backing-bean';

@Component({
  selector: 'page-aaa-nivel-competitividad',
  templateUrl: 'aaa-nivel-competitividad.html',
})
export class AaaNivelCompetitividadPage {

  public listaSeleccionados: any[];
  public listaOpciones: Promise<any[]>;

  constructor(
    public navCtrl: NavController, 
    private aaaBackingProvider: AaaBackingBeanProvider, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaNivelCompetitividadPage');

    //OBTENER DE LA LISTA DE POJOS, TODOS LOS SELECCIONADOS EN LA VISTA PREVIA
    this.listaSeleccionados = [];
    this.aaaBackingProvider.listaPojoDeporte.forEach(element => {
      if( element.seleccionado == true ){
        this.listaSeleccionados.push(element);
      }
    });

    this.listaOpciones = this.obtenerListaCompetitividad();
  }//ionViewDidLoad

  async obtenerListaCompetitividad(){
    return await this.aaaBackingProvider.getAllDocuments('deporteCompetitividad');
  }//obtenerListaDeportes

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

  competitividadSeleccionada(event){
    console.log('competitividadSeleccionada: '+event);
    //iterar la lista para encontrar el registro y colocarle la opcion seleccionada
    let index = this.listaSeleccionados.findIndex(obj => obj.deporte.nombre == event.nombre);
    if(index != -1){//si es -1, elimina el ultimo
      this.listaSeleccionados[index].competitividad = event.seleccion;
    }
    //colocarla tambien en la lista del backingbean
    let index2 = this.aaaBackingProvider.listaPojoDeporte.findIndex(obj => obj.deporte.nombre == event.nombre);
    if(index2 != -1){
      this.aaaBackingProvider.listaPojoDeporte[index2].competitividad = event.seleccion;
    }
    console.log('pojoDeportes1: '+ this.aaaBackingProvider.listaPojoDeporte );
    console.log('pojoDeportes2: '+ JSON.stringify(this.aaaBackingProvider.listaPojoDeporte) );
  }//frecuenciaSeleccionada

  accionInteresPrincipal(){
    this.navCtrl.push(AaaInteresPrincipalPage);
  }//accionInteresPrincipal

}//clase