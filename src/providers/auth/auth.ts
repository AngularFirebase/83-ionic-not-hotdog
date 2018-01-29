import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  user: Observable<any>;

  constructor(private afAuth: AngularFireAuth, 
              private afs: AngularFirestore, 
              private gp: GooglePlus,
              private platform: Platform) {

    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      })
    )
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
    });
  }


  googleLogin() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // return this.oAuthLogin(provider);
    
    this.gp.login({
      'webClientId': '581326886241-3pthiumf8t14p95siesg028gf9rde5pf.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    })
    .then(res => {
      console.log(res)
      return this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
    })
    .catch(err => console.log(err))

  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    // return this.afAuth.auth
    // .signInWithPopup(provider)
    //   .then((credential) => {
    //     return this.updateUserData(credential.user);
    //   })
    //   .catch(console.error);
  }

  private updateUserData(user: any) {
    
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: any = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
    };
    return userRef.set(data);
  }

}
