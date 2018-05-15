import { Component, Input } from '@angular/core';

@Component({
  selector: 'seleccion-deporte',
  templateUrl: 'seleccion-deporte.html'
})
export class SeleccionDeporteComponent {

  text: string;
  @Input('nombre')
  nombre: string;

  constructor() {
    console.log('Hello SeleccionDeporteComponent Component');
    this.text = 'Hello World';
  }

}
