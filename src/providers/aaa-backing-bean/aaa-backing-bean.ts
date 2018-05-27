//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { LoginManagerProvider } from '../login-manager/login-manager';

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
    private loginManager: LoginManagerProvider, 
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

  registrarInfo(){
    console.log('registrando usuario...');

    //1. guardar deportes seleccionados en tabla 'registro_deporte'
    
    let prom = Promise.resolve('done').then(val => {

      //verificar si existe un registro en la tabla registro usuario y obtenerlo, si no, crearlo
      this.consultarObjetoPorId('usuarios', '==', this.loginManager.userData.uid).then(res => {
        console.log('res: '+ JSON.stringify(res) );
        return 'usuario ya existe';
      }).catch(e => {
        console.log('error: '+e);
        let data = {
          ciudad: 'pend', 
          displayName: this.loginManager.userData.username, 
          email: this.loginManager.userData.email, 
          fechaNacimiento: 'pend', 
          genero: 1, 
          pais: 'pend', 
          username: this.loginManager.userData.username 
        };
        //crear registro en tabla usuarios
        return this.insertarObjeto('usuarios', data, this.loginManager.userData.uid).then(res => {
          return 'usuario creado';
        });
      }).then(val => {
        //preparar entity 'registroUsuario' y hacer registro
        console.log('crear entity: '+val);
        let data = {
          finalizado: true, 
          fkUsuario: '/usuarios/'+this.loginManager.userData.uid, 
          pasoRegistro: 0 
        };
        return this.insertarObjeto('registroUsuario', data, null).then(res => {
          return res;
        });
      });
    });
    
    console.log('info adicional registrada!');
  }//registrarUsuario
  
  insertarObjeto(coleccion: string, data: any, customId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let ref = null;
      if(customId != null){
        ref = this.db.collection(coleccion).doc(customId).set(data);
      }else{
        ref = this.db.collection(coleccion).add(data);
      }
      ref.then(res => {
        //se retorna id de la referencia creada
        if(customId != null){
          resolve(customId);
        }else{
          resolve(res.id);
        }
        
      });
    });
    return promise;
    //this.afstore.firestore.collection('usuarios').doc(user.uid).collection('registro').add({
  }//insertarObjeto

  consultarObjetoPorId(coleccion: string, operador: string, id: string): Promise<any>{
    //METODO ENCARGADO DE CONSULTAR REGISTROS POR ID
    let promise = new Promise((resolve, reject) => {
      let refColeccion = this.db.collection(coleccion);
      refColeccion.where(firebase.firestore.FieldPath.documentId(), operador, id).get().then(
        resultList => {
          var obj = null;
          resultList.forEach(doc => {
            obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id;
          });
          if(obj != null){
            console.log('va a resolver');
            resolve(obj);
          }else{
            console.log('va a hacer reject');
            reject('no existe registro');
          }
        }
      );
    });
    return promise;
  }//consultarObjetoPorId

}//clase