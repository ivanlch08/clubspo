//import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseServiceProvider {

  constructor(public afd: AngularFireDatabase) {
    console.log('Hello FirebaseServiceProvider Provider');
  }

  getShoppingItems(){
    //return this.afd.list('/shoppingItems').valueChanges();
    //return this.afd.list('/shoppingItems');
    /*this.afd.object('/shoppingItems').snapshotChanges()
    .map(action =>{ const data = action.payload.toJSON(); return data; })
    .subscribe(result =>{ Object.keys(result).map(key=>{ 
      listings.push({ 'key': key, 'data':result[key] }); 
    }); console.log(this.listings) });
  */
 //
    /*return this.afd.list('/shoppingItems').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
*/
  return this.afd.list('/shoppingItems').snapshotChanges().map(actions => {
    return actions.map(action => ({ key: action.key, val: action.payload.val() }));
  });
  }

  addItem(name){
    return this.afd.list('/shoppingItems').push(name);
  }

  removeItem(id){
    console.log('eliminando item: '+id);
    return this.afd.list('/shoppingItems').remove(id);
  }

  registrarLog(texto){
    return this.afd.list('/errores').push(texto);
  }

}//clase



/*
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FirebaseServiceProvider Provider');
  }

}
*/