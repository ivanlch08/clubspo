import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
//import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //shoppingItems: FirebaseListObservable<any[]>;
  //shoppingItems: AngularFireList<{}>;
  shoppingItems: Observable<any[]>;
  //shoppingItems: any[] = [];
  newItem = '';

  constructor(public navCtrl: NavController, public firebaseService: FirebaseServiceProvider) {
    this.shoppingItems = this.firebaseService.getShoppingItems();
  }

  addItem(){
    this.firebaseService.addItem(this.newItem);
    this.newItem = '';
  }

  removeItem(id){
    console.log('eliminando item: '+id);
    this.firebaseService.removeItem(id);
  }

}
