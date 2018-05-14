//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class AaaBackingBeanProvider {

  constructor(
    private afstore: AngularFirestore
  ) {
    console.log('Hello AaaBackingBeanProvider Provider');
  }//constructor

  obtenerListaDeportes(){
    var result = this.afstore.firestore.collection('usuarios');
    console.log('Hello AaaBackingBeanProvider Provider');
  }//obtenerListaDeportes

}//clase