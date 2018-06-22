import { Component, Input } from '@angular/core';
import { NoticiaDto } from '../../models/noticiaDto';

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

  @Input('noticia')
  noticia: NoticiaDto;

  constructor() {
    console.log('Hello TarjetaNoticiaComponent Component');
  }//constructor

  like(){
    this.noticia.likes += 1;
  }//like

}//clase