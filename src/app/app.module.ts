import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CuentaPropiaPage } from '../pages/cuentaPropia/cuentaPropia';
import { RegistroPage } from '../pages/registro/registro';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ConfirRegistroPage } from '../pages/confir-registro/confir-registro';
import { InicialPage } from '../pages/inicial/inicial';
import { AAADatosBasicosPage } from '../pages/aaa-datos-basicos/aaa-datos-basicos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginManagerProvider } from '../providers/login-manager/login-manager';

//para usar firestore
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FrecDeporteComponent } from '../components/frec-deporte/frec-deporte';

const firebaseConfig = {
  apiKey: "AIzaSyAsyAF_-kpfZYCXA7MN4Jpo1dbPj7AxR5k",
  authDomain: "pruebafire-530b1.firebaseapp.com",
  databaseURL: "https://pruebafire-530b1.firebaseio.com",
  projectId: "pruebafire-530b1",
  storageBucket: "pruebafire-530b1.appspot.com",
  messagingSenderId: "119463449441"
};

@NgModule({
  declarations: [
    MyApp,
    CuentaPropiaPage,
    RegistroPage,
    HomePage,
    TabsPage,
    ConfirRegistroPage,
    InicialPage, 
    AAADatosBasicosPage, 
    FrecDeporteComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp), 
    AngularFirestoreModule, 
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CuentaPropiaPage,
    RegistroPage,
    HomePage,
    TabsPage,
    ConfirRegistroPage,
    InicialPage, 
    AAADatosBasicosPage, 
    FrecDeporteComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider
    ,Facebook
    ,GooglePlus
    ,AngularFireAuth,
    LoginManagerProvider
  ]
})
export class AppModule {}
