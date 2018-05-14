import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../../pages/home/home';
import { LoginManagerProvider } from '../../providers/login-manager/login-manager';

//firebase
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import  firebase  from 'firebase';

//para autenticacion con facebook
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

//navegacion
import { AAADatosBasicosPage } from '../../pages/aaa-datos-basicos/aaa-datos-basicos';

@Component({
  selector: 'page-inicial',
  templateUrl: 'inicial.html',
})
export class InicialPage {

  userData = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth, 
    private toast: ToastController, 
    private loginManager: LoginManagerProvider, 
    private facebook:Facebook,
    public firebaseService: FirebaseServiceProvider 
  ) {
  }

  //ionViewDidLoad() {
  ionViewWillLoad() {
  //ngOnInit(){
    console.log('VERIFICAR SI SE ENCUENTRA ALGUIEN AUTENTICADO');
    this.userData = {
      email: 'nada@nada.com', 
      username: 'probando 1..'
    }
    /*
    this.firebaseService.registrarLog('VERIFICAR SI SE ENCUENTRA ALGUIEN AUTENTICADO');
    this.afAuth.authState.subscribe(data => {
      this.firebaseService.registrarLog('info inicial: '+data);
      if(data && data.email && data.uid){
        this.toast.create({
          message: 'Bienvenido a Clubspo!, '+data.email+'!', 
          duration: 4000
        }).present();
        this.navCtrl.setRoot(InicialPage);
      }else{
        this.toast.create({
          message: 'No hay usuarios autenticados..', 
          duration: 4000
        }).present();
        //nav a autenticacion
        this.navCtrl.setRoot(HomePage);
      }
    } 
    );*/
    
    //v2
    
    console.log('onAuthStateChanged');
    firebase.auth().onAuthStateChanged(this.verificarUsuario.bind(this));
    console.log('onAuthStateChanged finish');
    
  }//ionViewDidLoad

  verificarUsuario(user){
    console.log('metodo verificarUsuario');
    if(user){
      console.log('usuario autenticado');
      console.log(user);
      this.userData = {
        email: user.email, 
        username: 'probando 2..'
      }
      var usuario = firebase.auth().currentUser;
      console.log('usuario: '+usuario);
    }else{
      console.log('NO se encuentra autenticado');
    }
  }//cargarUsuario

  logout(){
    //verificar 
    //this.faceLogout();
    //ir a loginPage
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

  faceLogout(){
    this.facebook.logout().then(result => {
      this.toast.create({
        message: 'logout por facebook..', 
        duration: 4000
      }).present();
    });
  }//faceLogout

  accionIniciarAAA(){
    this.navCtrl.push(AAADatosBasicosPage);
  }//accionIniciarAAA

}//clase