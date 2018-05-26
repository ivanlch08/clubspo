import { Component, Input } from '@angular/core';

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

  constructor() {
    console.log('Hello InteresDeporteComponent Component');
  }//constructor

}//clase