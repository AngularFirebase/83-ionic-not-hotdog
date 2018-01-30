import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { VisionPage } from '../pages/vision/vision';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { Camera } from '@ionic-native/camera';


const firebaseConfig = {
  apiKey: 'AIzaSyAc9Tt8pQQF3ntu2Tz66iUKl_fXHtdhIyc',
  authDomain: 'firestarter-96e46.firebaseapp.com',
  databaseURL: 'https://firestarter-96e46.firebaseio.com',
  storageBucket: 'firestarter-96e46-vision',
  messagingSenderId: '581326886241',
  projectId: 'firestarter-96e46'
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VisionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VisionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera
  ]
})
export class AppModule {}
