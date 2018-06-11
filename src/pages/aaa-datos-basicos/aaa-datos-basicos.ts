import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AaaGustoDeportivoPage } from '../aaa-gusto-deportivo/aaa-gusto-deportivo';
import { AaaBackingBeanProvider } from '../../providers/aaa-backing-bean/aaa-backing-bean';

//navegacion
//import {} from '../';

@Component({
  selector: 'page-aaa-datos-basicos',
  templateUrl: 'aaa-datos-basicos.html',
})
export class AAADatosBasicosPage {

  //vista 1
  paisRef: String;
  ciudadRef: String;
  fechaNacimiento: Date;
  generoRef: number;

  mensajeError: String;

  listaPaises: any[];
  listaCiudades: any[];
  listaGeneros: any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private aaaBackingProvider: AaaBackingBeanProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AAADatosBasicosPage');
    
    //CARGAR LISTA DE PAISES
    this.aaaBackingProvider.getAllDocuments('pais').then(res => {
      this.listaPaises = res;
    });

    //CARGAR LISTA DE GENEROS
    this.aaaBackingProvider.getAllDocuments('genero').then(res => {
      this.listaGeneros = res;
    });

  }//ionViewDidLoad

  refrescarCiudad(event){
    this.aaaBackingProvider.consultarListaDocumentos('ciudad', 'fk_pais', '==', event).then(res => {
      this.listaCiudades = res;
    });
  }//refrescarCiudad

  guardarInfo(): boolean{
    //validar info
    this.mensajeError = '';
    let conError: boolean = false;
    if(this.paisRef == null){
      conError = true;
      this.mensajeError += 'Ingresa un país. ';
    }
    if(this.ciudadRef == null){
      conError = true;
      this.mensajeError += 'Ingresa una ciudad. ';
    }
    if(this.fechaNacimiento == null){
      conError = true;
      this.mensajeError += 'Ingresa la fecha de nacimiento. ';
    }
    if(this.generoRef == null){
      conError = true;
      this.mensajeError += 'Ingresa un género. ';
    }
    
    if(conError){
      return false;
    }

    //guardar info
    this.aaaBackingProvider.paisRef = this.paisRef;
    this.aaaBackingProvider.ciudadRef = this.ciudadRef;
    this.aaaBackingProvider.fechaNacimiento = this.fechaNacimiento;
    this.aaaBackingProvider.generoRef = this.generoRef;

    return true;
  }//guardarInfo

  accionGustoDeportivo(){
    if(this.guardarInfo()){
      this.navCtrl.push(AaaGustoDeportivoPage);
    }
  }//accionGustoDeportivo

}//clase