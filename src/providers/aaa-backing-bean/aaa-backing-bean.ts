//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
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

  registrarInfo(): Observable<any>{
    const primerObs = new Observable((observer) => {
      console.log('registrando usuario...');
      this.prepararInformacionRegistro()
      .then(res => {
        console.log('a insertar info: '+res);
      })
      .then(res => {
        //CONSULTAR FK DE REGISTRO_USUARIO
        return this.consultarDocumento('registroUsuario', 'fkUsuario', '==', '/usuarios/'+this.loginManager.userData.uid).then(res => {
          return res;
        })
      })
      .then(res => {
        //REGISTRAR EN TABLA REGISTRO DEPORTE
        //console.log('res: '+ JSON.stringify(res) );
        this.listaPojoDeporte.filter(row => row.seleccionado == true).forEach(async row => {
          await this.registrarDeporte(row, res)
          .then(x => {
            //console.log('uuuultimo1: '+res);
            //REGISTRAR EL LISTADO DE INTERESES POR CADA DEPORTE
            this.registrarInteres(row, x).then(x2 => {
              console.log('interes registrado: '+x2);
            });
          });
        });
      }).then(res => {
        //CAMBIAR EL ESTADO DE LA BANDERA DE REGISTRO
        //1. obtener el registro de la bd
        //2. cambiar el atributo
        //3. volver a guardar el atributo
        this.consultarDocumento('registroUsuario', 'fkUsuario', '==', '/usuarios/'+this.loginManager.userData.uid).then(res => {
          console.log('cambiando estado...');
            res.pasoRegistro = 1;
          console.log('guardando cambio...');
          this.actualizarDocumento('registroUsuario', res.$key, res).subscribe(r => {
            //FINALIZAR OBSERVABLE
            observer.next(true);
            observer.complete();
          });
        });
      })
      .catch(err => {
        console.error('eror: '+err);
        observer.next(false);
          observer.complete();
      });
    });

    return primerObs;
  }//registrarInfo

  registrarInteres(pojoDeporte: any, _fkRegistroDeporte: any): Promise<any>{
    //CREA UN LISTADO DE INTERESES PARA CADA REGISTRO_DEPORTE
    let promise = new Promise((resolve, reject) => {
      pojoDeporte.listaInteres.forEach(element => {
        //preparar entity
        let data = {
          fkRegistroDeporte: _fkRegistroDeporte, 
          fkInteres: element
        }
        this.insertarObjeto('registro_interes', data, null).then(r => {
          //console.log('registro int: '+r);
        })
      });
    });
    return promise;
  }//registrarInteres

  registrarDeporte(pojoDeporte: any, registroUsuario: any): Promise<any>{
    //CREA UN REGISTRO EN LA TABLA REGISTRO_DEPORTE
    let promise = new Promise((resolve, reject) => {
      //registro_deporte
      console.log('registrando deporte; '+pojoDeporte.deporte.nombre);
      
      let data = {
        fkDeporte: pojoDeporte.deporte.$key, 
        fkRegistroUsuario: registroUsuario.$key, 
        fkCompetitividad: pojoDeporte.competitividad, 
        fkRegularidad: pojoDeporte.frecuencia
      }
      //v0
      /*resolve(
        this.insertarObjeto('registro_deporte', data, null).then(r => {
          console.log('registro1: '+r);
          return r;
        })
      );*/
      //v1
      this.insertarObjeto('registro_deporte', data, null).then(r => {
        console.log('registro1: '+r);
        resolve(r);
      })
    });
    return promise;
  }//registrarDeporte

  prepararInformacionRegistro(): Promise<any>{
    //SE ENCARGA DE VERIFICAR Y DEJAR UN REGISTRO EN LA TABLA USUARIO Y EN LA TABLA REGISTRO_USUARIO
    let promise = new Promise((resolve, reject) => {
      //verificar si existe un registro en la tabla registro usuario y obtenerlo, si no, crearlo
      this.consultarObjetoPorId('usuarios', '==', this.loginManager.userData.uid).then(res => {
        console.log('prepararInformacionRegistro.res: '+ JSON.stringify(res) );
        return 'usuario ya existe';
      }).catch(e => {
        //no existe el usuario, se va a registrar en la tabla de usuarios
        console.log('prepararInformacionRegistro.error: '+e);
        let data = {
          ciudad: this.ciudadRef, 
          displayName: this.loginManager.userData.username, 
          email: this.loginManager.userData.email, 
          fechaNacimiento: this.fechaNacimiento, 
          genero: this.generoRef, 
          pais: this.paisRef, 
          username: this.loginManager.userData.username 
        };
        return this.insertarObjeto('usuarios', data, this.loginManager.userData.uid).then(res => {
          return 'usuario creado';
        });
      }).then(val => {
        //verificar si existe 'registroUsuario'
        this.consultarDocumento('registroUsuario', 'fkUsuario', '==', '/usuarios/'+this.loginManager.userData.uid).then(res => {
          console.log('prepararInformacionRegistro.res: '+ JSON.stringify(res) );
          return 'registro existe';
        }).catch(err => {
          //no existe el registro, se va a crear en la tabla de registroUsuario
          console.log('prepararInformacionRegistro.crear entity: '+val);
          let data = {
            finalizado: true, 
            fkUsuario: '/usuarios/'+this.loginManager.userData.uid, 
            pasoRegistro: 0 
          };
          return this.insertarObjeto('registroUsuario', data, null).then(res => {
            return res;
          });
        }).then(res => {
          resolve('informacion preparada!: '+res);
        });
      });
    });
    
    console.log('prepararInformacionRegistro.tablas usuario y registro_usuario preparadas!');
    return promise;
  }//prepararInformacionRegistro.
  
  insertarObjeto(coleccion: string, data: any, customId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      console.log('-a');
      let ref = null;
      if(customId != null){
        ref = this.db.collection(coleccion).doc(customId).set(data);
      }else{
        ref = this.db.collection(coleccion).add(data);
      }
      ref.then(x => {
        console.log('-b');
        if(customId != null){
          console.log('-c');
          resolve(customId);
        }else{
          console.log('-d');
          resolve(x.id);
        }
      });
    });
    return promise;
  }//insertarObjeto

  insertarObjeto2(coleccion: string, data: any, customId: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      console.log('-a');
      let ref = null;
      if(customId != null){
        ref = this.db.collection(coleccion).doc(customId).set(data);
      }else{
        ref = this.db.collection(coleccion).add(data);
      }
      ref.then(res => {
        console.log('-b');
        //se retorna id de la referencia creada
        if(customId != null){
          console.log('-c');
          resolve(customId);
        }else{
          console.log('-d');
          resolve(res.id);
        }
        
      });
      console.log('-e');
    });
    return promise;
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
            console.log('existe: '+JSON.stringify(obj));
            resolve(obj);
          }else{
            console.error('no existe registro: '+coleccion+'/'+id);
            reject('no existe registro');
          }
        }
      );
    });
    return promise;
  }//consultarObjetoPorId

  consultarDocumento(coleccion: string, campo: string, operador: string, valor: string): Promise<any>{
    //METODO ENCARGADO DE CONSULTAR UN SOLO DOCUMENTO
    let promise = new Promise((resolve, reject) => {
      let refColeccion = this.db.collection(coleccion);
      refColeccion.where(campo, operador, valor).get().then(
        resultList => {
          var obj = null;
          resultList.forEach(doc => {
            obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id;
          });
          if(obj != null){
            console.log('existe: '+JSON.stringify(obj));
            resolve(obj);
          }else{
            console.error('no existe registro: '+coleccion+'/'+campo+'/'+valor);
            reject('no existe registro');
          }
        }
      );
    });
    return promise;
  }//consultarDocumento

  consultarListaDocumentos(coleccion: string, campo: string, operador: string, valor: string): Promise<any>{
    return new Promise((resolve, reject) => {
        this.db.collection(coleccion).where(campo, operador, valor)
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

  actualizarDocumento(coleccion: string, id: string, data: string): Observable<any> {
    const primerObs = new Observable((observer) => {

      let refDoc = this.db.collection(coleccion).doc(id);
      refDoc.get()
      .then(doc => {
        if( doc ){
          console.log('doc: '+doc);
          refDoc.update(data);
          console.log('actualizado');
          observer.next(true);
          observer.complete();
        }else{
          console.error('no existe el documento');
          observer.next(false);
          observer.complete();
        }
      });
    });
    return primerObs;
  }//actualizarDocumento

}//clase