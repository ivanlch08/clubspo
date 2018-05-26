//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class AaaBackingBeanProvider {

  //referencias
  private db: any;

  //listas
  listaDeportes: Observable<any[]>;

  public listaPojoDeporte: any[] = [];

  //vista 1
  public paisRef: String;
  ciudadRef: String;
  fechaNacimiento: Date;
  generoRef: number;

  //vista 2, gustos deportivos
  public listaDeportesSeleccionados: any[] = [];

  constructor(
    public afd: AngularFireDatabase,
    private afstore: AngularFirestore
  ) {
    console.log('Hello AaaBackingBeanProvider Provider');
    this.db = firebase.firestore();
    //this.obtenerListaDeportes();
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaBackingBeanProvider');
  }//ionViewDidLoad

  async obtenerListaDeportes(){
    console.log('obteniendo deps');
    const deps = await this.getAllDocuments('deportes');
    this.listaDeportes = deps;
    console.log('fin deps');
  }//obtenerListaDeportes

  obtenerListaDeportes2(){
    console.log('obtenerListaDeportes');
    let deportesRef: AngularFireList<any> = this.afd.list('/deportes');
    this.listaDeportes = deportesRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }//obtenerListaDeportes

  getAllDocuments(collection: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.db.collection(collection)
            .get()
            .then((querySnapshot) => {
                let arr = [];
                querySnapshot.forEach(function (doc) {
                    var obj = JSON.parse(JSON.stringify(doc.data()));
                    obj.$key = doc.id
                    console.log(obj)
                    arr.push(obj);
                });
 
                if (arr.length > 0) {
                    console.log("Document data:", arr);
                    resolve(arr);
                } else {
                    console.log("No such document!");
                    resolve(null);
                }
 
 
            })
            .catch((error: any) => {
                reject(error);
            });
      });
  }

  registrarInfo(info, usuario){
    console.log('registrando usuario...');
    //let rid: string = ''+Math.random()*100000;
    console.log('id aleatorio: '+usuario.uid);
    
    /*
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
    */
    console.log('info adicional registrada!');
  }//registrarUsuario
  
}//clase