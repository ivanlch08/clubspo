import { Component } from '@angular/core';

@Component({
  selector: 'interes-deporte',
  templateUrl: 'interes-deporte.html'
})
export class InteresDeporteComponent {

  text: string;

  constructor() {
    console.log('Hello InteresDeporteComponent Component');
    this.text = 'Hello World';
  }

}//clase