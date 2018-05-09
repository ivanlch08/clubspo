import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-aaa-datos-basicos',
  templateUrl: 'aaa-datos-basicos.html',
})
export class AAADatosBasicosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AAADatosBasicosPage');
  }

}
