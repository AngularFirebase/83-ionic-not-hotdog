import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts;

  constructor(public navCtrl: NavController, private db: AngularFirestore) {
    this.posts = this.db.collection('posts').valueChanges();
  }

  ionViewDidLoad() {
    
  }


}
