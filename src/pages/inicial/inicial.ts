import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../../pages/home/home';
import { LoginManagerProvider } from '../../providers/login-manager/login-manager';

//firebase
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

//para autenticacion con facebook
import { Facebook } from '@ionic-native/facebook';

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
      email: 'ninguno', 
      username: 'ninguno'
    }
    
    //OBTENER EL USUARIO AUTENTICADO, O REDIRECCIONAR A LA PANTALLA DE LOGIN
    this.loginManager.obtenerInfoUsuario().subscribe(
      r => this.recibirInfoAuth(r)
      , 
      e => this.direccionarAhome(e)
      );
  }//ionViewDidLoad 

  recibirInfoAuth(result){
    this.userData = result;
  }//recibirInfoAuth

  direccionarAhome(result){
    this.navCtrl.setRoot(HomePage);
  }//direccionarAhome

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