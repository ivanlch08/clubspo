import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';
import  firebase  from 'firebase';

import { CuentaPropiaPage } from '../cuentaPropia/cuentaPropia';
import { InicialPage } from '../inicial/inicial';

//para autenticacion con facebook
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
//para autenticacion con google
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  conectado : boolean = false;
  conectadoFace : boolean = false;
  conectadoGoogle : boolean = false;

  shoppingItems: Observable<any[]>;
  newItem = '';

  userData = null;
  mensajeLog = '';

  //para googlelogin
  user : Observable<firebase.User>;

  constructor(
    public navCtrl: NavController, 
    public firebaseService: FirebaseServiceProvider, 
    private facebook:Facebook,
    private afAuth:AngularFireAuth,
    private platform:Platform,
    private gplus:GooglePlus
  ) {
    
    this.shoppingItems = this.firebaseService.getShoppingItems();
    
    //this.procesoInicialVerificarLoginFace();
    //this.procesoInicialVerificarLoginGoogle();

  }//constructor

  procesoInicialVerificarLoginGoogle(){
    this.user = this.afAuth.authState;
  }//procesoInicialVerificarLoginGoogle

  procesoInicialVerificarLoginFace(){
    //verificar si el usuario se encuentra autenticado
    
    this.faceVerificarEstado().then(result => {
      this.conectado = result;
      if(this.conectado){
        this.faceObtenerInfoUsuario();
        //ocultar botones de login
        //mostrar boton de logout
      }
    });
  }//procesoInicialVerificarLoginFace

  addItem(){
    this.firebaseService.addItem(this.newItem);
    this.newItem = '';
  }

  removeItem(id){
    console.log('eliminando item: '+id);
    this.firebaseService.removeItem(id);
  }

  faceLoginWeb(){
    let provider = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithRedirect(provider).then(()=>{
      firebase.auth().getRedirectResult().then((result)=>{
        this.userData = { email: result['email'], first_name: result['first_name'], picture: result['picture_large']['data']['url'], username: result['name'] };
      }).catch(function(error){
        console.log(error);
      })
    });
  }//loginFaceWeb
  
  async faceLoginApp() : Promise<void> {
    try{
      const facebookUser = await this.facebook.login(['email','public_profile'])
      await this.afAuth.auth.signInWithCredential(
        firebase.auth.FacebookAuthProvider.credential(facebookUser.authResponse.accessToken)
      ).then(credential => {
        this.conectado = true;
        this.userData = {email: credential['email'], first_name: credential['displayName'], picture: credential['photoURL'], username: credential['displayName']}
      });
    }catch(err){
      console.log(err);
    }
  }//loginFaceApp

  faceVerificarEstado() : Promise<any> {
    const promise = new Promise( (resolve, reject) => {
      
      this.facebook.getLoginStatus().then(result => {
        this.mensajeLog = 'estado login: '+result.status;
        var conne:boolean = 'connected' == result.status;
        if(conne){
          resolve(conne);
        }else{
          reject(conne);
        }
      }).catch(function(error){
        reject(false);
      });

    });
    
    return promise;
  }//verificarEstado

  faceObtenerInfoUsuario(){
    this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
      this.conectado = true;
      this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] };
    });
  }//faceObtenerInfoUsuario

  faceLogout(){
    this.facebook.logout().then(result => {
      this.conectadoFace = false;
    });
  }//faceLogout

  googleLogin(){
    if( this.platform.is('cordova') ){
      this.nativeGoogleLogin();
    }else{
      this.webGoogleLogin();
    }
  }//googleLogin

  async nativeGoogleLogin() : Promise<void> {
    try{
      const gplususer = await this.gplus.login({
        'webClientId': '119463449441-8ldpb4q8r6u3vesdu937psij4k8a8m4g.apps.googleusercontent.com', 
        'offline' : true, 
        'scopes' : 'profile email'
      })

      await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplususer.idToken)
      ).then(credential => {
        this.conectado = true;
        this.userData = {email: credential['email'], first_name: credential['displayName'], picture: credential['photoURL'], username: credential['displayName']}
      });

    }catch(err){
      console.log(err);
    }

  }//nativeGoogleLogin

  async webGoogleLogin() : Promise<void> {
    try{
      const provider = new firebase.auth.GoogleAuthProvider();
      
      await this.afAuth.auth.signInWithPopup(provider).then(credential => {
        console.log('credential: '+JSON.stringify(credential));
        this.conectado = true;
        let usuario = credential.user;
        this.userData = {email: usuario['email'], first_name: usuario['displayName'], picture: usuario['photoURL'], username: usuario['displayName']}
      });
    }catch(err){
      console.log(err);
    }

  }//nativeGoogleLogin

  googleLogout(){
    this.afAuth.auth.signOut();
    if( this.platform.is('cordova') ){
      this.gplus.logout();
    }
    this.conectadoGoogle = false;
  }//googleLogout

  logout(){
    if(this.conectado){
      if(this.conectadoFace){
        this.faceLogout();
      }else if(this.conectadoGoogle){
        this.googleLogout();
      }
      this.conectado = false;
      this.userData = null;
    }
  }//logout
  //alert(JSON.stringify(error));

  irCuentaPropia(){
    this.navCtrl.push(CuentaPropiaPage);
  }//irCuentaPropia

  irPrincipal(){
    this.navCtrl.push(InicialPage);
  }

}//clase