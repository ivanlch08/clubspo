import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-aaa-popup-deporte',
  templateUrl: 'aaa-popup-deporte.html',
})
export class AaaPopupDeportePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewController: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaPopupDeportePage');
  }

  accionVolver(){
    this.viewController.dismiss();
  }
}//clase