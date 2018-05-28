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
import { AaaBackingBeanProvider } from '../../providers/aaa-backing-bean/aaa-backing-bean';

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
    private aaaBackingProvider: AaaBackingBeanProvider,
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

  pruebaRegistro(){
    let data = {
      nombre: 'abc'
    }
    this.pruebaListaPromesas().then(x => {
      this.aaaBackingProvider.insertarObjeto('temporal', data, null).then(x => {
        console.log('info registrada: '+x);
      })
    }
    ).then(x => {
      console.log('ultimo: '+x);
    });
    //this.pruebaListaToPromises();
  }//pruebaRegistro

  pruebaListaToPromises(){
    console.log('uno');
    this.pruebaListaPromesas()
    .then(r => console.log('r: '+r))
    .then(r => console.log('dos'))
    .then(r => console.log('tres'))
    .then(r => {
      console.log('A')
      let arr = [1, 2, 3, 4, 5];
      arr.forEach(element => {
        this.aaaBackingProvider.insertarObjeto('temporal', {nombre:'def'}, null).then(x => {
          console.log('--AB--'+x)
        });
      });
      console.log('B')
    })
    .then(r => console.log('cinco'))
    ;
  }//pruebaListaToPromises

  pruebaListaPromesas(): Promise<any>{
    let arr = [1, 2, 3, 4, 5];
    let promise = new Promise((resolve, reject) => {
      //setTimeout( () => console.log('val'), 2000 );
      console.log('ini');
      arr.forEach(async element => {
        await this.pruebaLog(element);
      });
      resolve('fin p');
    });
    return promise;
  }//pruebaListaPromesas

  pruebaLog(val: number): Promise<any>{
    let promise = new Promise((resolve, reject) => {
      //setTimeout( () => console.log(val), 1000 );
      console.log(val);
      resolve(val);
    });
    return promise;
  }
}//clase