import { Component } from '@angular/core';

/**
 * Generated class for the TarjetaNoticiaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tarjeta-noticia',
  templateUrl: 'tarjeta-noticia.html'
})
export class TarjetaNoticiaComponent {

  text: string;

  constructor() {
    console.log('Hello TarjetaNoticiaComponent Component');
    this.text = 'Hello World';
  }

}
