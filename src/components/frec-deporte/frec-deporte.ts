import { Component } from '@angular/core';
import { CheckBoolValor } from '../../models/checkBoolValor';

@Component({
  selector: 'frec-deporte',
  templateUrl: 'frec-deporte.html'
})
export class FrecDeporteComponent {
  imagen: string;
  deporte: string;
  lista: CheckBoolValor[];
  seleccion: string;
  constructor() {
    console.log('Hello FrecDeporteComponent Component');
    this.deporte = 'futbol';
    let op1: CheckBoolValor = {
      valor: false, 
      texto: 'poco'
    }
    let op2: CheckBoolValor = {
      valor: false, 
      texto: 'medio'
    }
    let op3: CheckBoolValor = {
      valor: false, 
      texto: 'alto'
    }

    this.lista = [op1, op2, op3];
  }//constructor

}//clase