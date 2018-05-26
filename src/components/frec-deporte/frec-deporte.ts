import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CheckBoolValor } from '../../models/checkBoolValor';
import { AaaBackingBeanProvider } from '../../providers/aaa-backing-bean/aaa-backing-bean';

@Component({
  selector: 'frec-deporte',
  templateUrl: 'frec-deporte.html'
})
export class FrecDeporteComponent {
  imagen: string;
  @Input('nombre')
  nombre: string;
  @Input('opciones')
  lista: Promise<any[]>;
  seleccion: string;

  @Output('checkSeleccion')
  public checkSeleccion = new EventEmitter();

  @Output('eliminarDep')
  public eliminarDep = new EventEmitter();

  constructor(
    private aaaBackingProvider: AaaBackingBeanProvider
  ) {
    console.log('Hello FrecDeporteComponent Component');
    
  }//constructor

  checkSeleccionado(){
    //se lanza evento indicando la opcion seleccionada
    console.log('nombre: '+this.nombre);
    console.log('selecc: '+this.seleccion);
    this.checkSeleccion.emit({
      nombre: this.nombre, 
      seleccion: this.seleccion
    });
  }//checkSeleccionado

  eliminarDeporte(){
    //lanzar evento indicando el deporte eliminado
    this.eliminarDep.emit(this.nombre);
  }//eliminarDeporte

  async obtenerListaFrecuencias(){
    return await this.aaaBackingProvider.getAllDocuments('deporteRegularidad');
  }//obtenerListaDeportes

}//clase