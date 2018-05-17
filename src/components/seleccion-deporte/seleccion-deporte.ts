import { Component, Input } from '@angular/core';

@Component({
  selector: 'seleccion-deporte',
  templateUrl: 'seleccion-deporte.html'
})
export class SeleccionDeporteComponent {

  @Input('nombre')
  nombre: string;

  @Input('imagen')
  imagen: string;

  seleccionado: boolean;

  constructor() {
    console.log('Hello SeleccionDeporteComponent Component');
  }

  ionViewDidLoad() {
    //this.imagen = 'assets/imgs/misteryBox.png';
  }

  accionSeleccion(){
    console.log('click: '+this.nombre);
    this.imagen = 'assets/imgs/misteryBox.png';
    this.seleccionado = !this.seleccionado;
  }
}//clase