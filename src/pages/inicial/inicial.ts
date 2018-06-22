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
//import { Observable } from '@firebase/util';
import { Observable } from 'rxjs/Rx';
import { NoticiaDto } from '../../models/noticiaDto';

@Component({
  selector: 'page-inicial',
  templateUrl: 'inicial.html',
})
export class InicialPage {

  userData = null;

  habilitarRegistro: boolean = false;

  //lista que contiene las tarjetas de noticias
  listaNoticias:NoticiaDto[] = [];

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
    
  }//constructor

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
      r => {
        this.recibirInfoAuth(r);
        this.verificarRegistroBasico().subscribe(regCompleto => {
          if( regCompleto ){
            this.habilitarRegistro = true;
            //mirar la posibilidad de direccionar al registro basico inmediatamente
          }else{
            this.habilitarRegistro = false;
            //se carga la lista de noticias
            this.cargarNoticias();
          }
        });
      }
      , 
      e => this.direccionarAhome(e)
      );
  }//ionViewDidLoad 

  cargarNoticias(){
    console.log('cargando noticias...');
    
    let n1:NoticiaDto = {
      id: 1,
      usuario: 'Iván Chacón',
      tipo: 'string',
      imagen: '../../assets/imgs/jurasic.jpg',
      texto: 'bla bla bla',
      likes: 0,
      listaComentarios: []
    }

    let n2:NoticiaDto = {
      id: 1,
      usuario: 'Pedro Perez',
      tipo: 'string',
      imagen: '../../assets/imgs/future.png',
      texto: 'xxxxx xxxxx xxxxx xxxxx',
      likes: 2,
      listaComentarios: []
    }

    let n3:NoticiaDto = {
      id: 1,
      usuario: 'Sarah Connor',
      tipo: 'string',
      imagen: '../../assets/imgs/terminator.jpg',
      texto: '123 123 123 123 123 123 123',
      likes: 4,
      listaComentarios: []
    }
    
    this.listaNoticias.push(n1);
    this.listaNoticias.push(n2);
    this.listaNoticias.push(n3);
  }//cargarNoticias

  //verifica si el usuario ya registró la información básica, para así habilitarle
  //el CUAAA para diligenciar la información básica
  verificarRegistroBasico(): Observable<any> {
    const varObservable  = new Observable((observer) => {
      this.aaaBackingProvider.consultarDocumento('registroUsuario', 'fkUsuario', '==', '/usuarios/'+this.loginManager.userData.uid).then(res => {
        if( res.pasoRegistro == 0 ){
          observer.next(true);
        }else{
          observer.next(false);
        }
        observer.complete();
      }).catch(err => {
        observer.next(true);
        observer.complete();
      });
    });

    return varObservable;
  }//verificarRegistroBasico

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
/*
  faceLogout(){
    this.facebook.logout().then(result => {
      this.toast.create({
        message: 'logout por facebook..', 
        duration: 4000
      }).present();
    });
  }//faceLogout
*/
  accionIniciarAAA(){
    this.navCtrl.push(AAADatosBasicosPage);
  }//accionIniciarAAA
/*
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
*/
/*
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
*/
/*
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
*/
  trackByFn(index, item){
    return index;
  }
}//clase