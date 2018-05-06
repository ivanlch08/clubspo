import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

import { User } from '../../models/user';

@Injectable()
export class FirebaseServiceProvider {

  usuariosRef: AngularFireList<any>;
  listaUsuarios: Observable<any[]>;
  
  constructor(
    public afd: AngularFireDatabase, 
    private afstore: AngularFirestore) {
    console.log('Hello FirebaseServiceProvider Provider');

    //prueba inserts
    console.log('cargando lista de usuarios...');
    this.usuariosRef = this.afd.list('/usuarios');
    this.listaUsuarios = this.usuariosRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    
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

  registrarUsuario(user: User){
    console.log('registrando usuario...');
    //let rid: string = ''+Math.random()*100000;
    console.log('id aleatorio: '+user.uid);
    
    const nuevoUsuario = this.usuariosRef.push({});
    nuevoUsuario.set({
      id: user.uid, 
      displayName: user.nombre,
      email: user.email
    });

    //v2
    let data = {
      displayName: user.nombre,
      email: user.email
    };
    
    this.afstore.firestore.collection('usuarios').doc(user.uid).set(data)
    .then(userRef => {
      this.afstore.firestore.collection('usuarios').doc(user.uid).collection('registro').add({
        notificadoPorCorreo: 'no'
      }).then(result => {
        console.log('registro correo creado!');
      }).catch(function(err){
        console.log('error creando correo: '+err);
      })
    });

    console.log('usuario registrado!');
  }//registrarUsuario

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