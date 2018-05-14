import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-aaa-interes-principal',
  templateUrl: 'aaa-interes-principal.html',
})
export class AaaInteresPrincipalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AaaInteresPrincipalPage');
  }

}
