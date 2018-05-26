import { Component, Input, EventEmitter, Output } from '@angular/core';

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

  estilo: string = "fondoUnselect";

  @Output()
  public childEvent = new EventEmitter();

  constructor() {
    console.log('Hello SeleccionDeporteComponent Component');
  }

  ionViewDidLoad() {
    //this.imagen = 'assets/imgs/misteryBox.png';
  }

  accionSeleccion(){
    //console.log('click: '+this.nombre);
    //this.imagen = 'assets/imgs/misteryBox.png';
    this.seleccionado = !this.seleccionado;
    //cambiar estilo del componente
    if(this.seleccionado){
      this.estilo = "fondoSelect";
    }else{
      this.estilo = "fondoUnselect";
    }
    //enviar mensaje de la seleccion realizada al padre
    this.childEvent.emit({
      seleccionado: this.seleccionado, 
      nombre: this.nombre, 
      frecuencia: null
    });
  }//accionSeleccion
}//clase