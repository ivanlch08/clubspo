import { Injectable } from '@angular/core';

import  firebase  from 'firebase';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoginManagerProvider {

  userData = null;

  constructor() {
    console.log('Hello LoginManagerProvider Provider');
  }//constructor

  obtenerInfoUsuario(): Observable<any> {
    const primerObservable = new Observable((observer) => {
      firebase.auth().onAuthStateChanged((resAuth) => {
        this.verificarUsuario(resAuth).subscribe((resVer) => {
          observer.next(resVer);
          observer.complete();
        }, 
        e => observer.error(e)
        );
      });
    });
    return primerObservable;
    
  }//obtenerInfoUsuario

  verificarUsuario(user): Observable<any> {
    const obsVerificarUsuario = new Observable((observer) => {
      if(user){
        this.cargarInfoUsuario().subscribe((res) => {
          res.uid = user.uid;
          observer.next(res);
          observer.complete();
        }, 
        e => observer.error(e)
      );
      }else{
        observer.error('NO se encuentra autenticado');
      }
    });

    return obsVerificarUsuario;
  }//verificarUsuario

  cargarInfoUsuario(): Observable<any> {
    const obsCargarInfo = new Observable((observer) => {

      var usuario = firebase.auth().currentUser;
      if(usuario != null){
        usuario.providerData.forEach(row => {
          this.userData = {
            email: row.email, 
            username: row.displayName, 
            picture: row.photoURL, 
            first_name: row.displayName, 
            uid: row.uid
          }
        });
        observer.next(this.userData);
        observer.complete();
      }else{
        observer.error('Error cargando la informacion del usuario');
      }
    });
    return obsCargarInfo;
  }//cargarInfoUsuario

  logout(){
    //this.navCtrl.setRoot(HomePage);
  }//logout
  
}//clase