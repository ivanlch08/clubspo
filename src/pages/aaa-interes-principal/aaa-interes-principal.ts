import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AaaBackingBeanProvider } from '../../providers/aaa-backing-bean/aaa-backing-bean';
import { InicialPage } from '../inicial/inicial';

@Component({
  selector: 'page-aaa-interes-principal',
  templateUrl: 'aaa-interes-principal.html',
})
export class AaaInteresPrincipalPage {

  mensajeError:string = "";
  mostrarBoton:boolean = true;

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

  registrarSeleccion(event){
    console.log('registrarSeleccion1: '+event);
    console.log('registrarSeleccion2: '+ JSON.stringify(event) );
    
    //registrar la seleccion en el backingbean
    let index = this.aaaBackingProvider.listaPojoDeporte.findIndex(obj => obj.deporte.nombre == event.nombre);
    if(index != -1){
      if( event.seleccionado ){//agregar opcion
        this.aaaBackingProvider.listaPojoDeporte[index].listaInteres.push(event.interes);
      }else{//eliminar opcion
        let index2 = this.aaaBackingProvider.listaPojoDeporte[index].listaInteres.findIndex(obj => obj == event.interes);
        if(index2 != -1){
          this.aaaBackingProvider.listaPojoDeporte[index].listaInteres.splice(index2, 1);
        }
      }
      
    }

    console.log('registrarSeleccion3: '+ JSON.stringify(this.aaaBackingProvider.listaPojoDeporte) );
  }//registrarSeleccion

  trackByFn(index, item){
    return index;
  }//trackByFn

  accionFinalizar(){
    //VALIDACIONES
    let error:boolean = false;
    this.aaaBackingProvider.listaPojoDeporte.forEach(element => {
      //verificar si es de los seleccionados por el usuario
      let index = this.listaSeleccionados.findIndex(obj => obj.deporte.nombre == element.deporte.nombre);
      if( index != -1 ){
        if(element.listaInteres && element.listaInteres.length){
          //no esta vacio
        }else{
          //esta vacio
          error = true;
        }
      }
    });

    if(error){
      //no se ha seleccionado nada
      this.mensajeError = "Debes seleccionar al menos un interés por deporte.";
      return;
    }

    //OCULTAR BOTON DE REGISTRO
    this.mostrarBoton = false;
    
    //GUARDAR INFO EN BASE DE DATOS
    console.log('va a guardar info...');
    this.aaaBackingProvider.registrarInfo().subscribe(res => {
      this.navCtrl.setRoot(InicialPage);
      console.log('info guardada!');
    });
    
  }//accionFinalizar

}//clase