import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'interes-deporte',
  templateUrl: 'interes-deporte.html'
})
export class InteresDeporteComponent {

  @Input('nombre')
  nombre: string;
  @Input('opciones')
  lista: Promise<any[]>;
  listaSeleccionados: any[] = [];

  @Output('selectOpcion')
  public emmiterSeleccion = new EventEmitter();

  constructor() {
    console.log('Hello InteresDeporteComponent Component');
  }//constructor

  selectOpcion(event, opcion, nombre){
    console.log('event1: '+event.checked);
    console.log('opcion: '+opcion);

    this.emmiterSeleccion.emit({
      seleccionado: event.checked, 
      nombre: nombre, 
      interes: opcion 
    });
    
  }//selectOpcion

}//clase