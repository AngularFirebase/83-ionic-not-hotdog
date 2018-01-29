import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore} from 'angularfire2/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-vision',
  templateUrl: 'vision.html',
})
export class VisionPage {

  task;
  progress;
  image;
  labels$;
  evt;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore, private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisionPage');
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then(base64 => {
      console.log(base64)
      this.image = base64
      this.startUpload(base64)
    })
    .catch(err => console.log(JSON.stringify(err)))
  }

  startUpload(file: string) {

    const timestamp = new Date().getTime().toString();
    const path = `${timestamp}.jpg`;

    this.labels$ = this.afs.collection('photos').doc(timestamp).valueChanges();

    // firebase.storage.StringFormat.DATA_URL
    console.log(file)
    
    // The main task
    file = 'data:image/jpg;base64,' + file
    this.task = this.storage.ref(path).putString(file, 'data_url')//.putString(file, 'data_url')//.upload(path, file);

    // Progress monitoring
    this.progress = this.task.percentageChanges();
  }

  log(e) { 
    // alert(JSON.stringify(e))
    console.log(JSON.stringify(e)) 
    this.startUpload(  e.target.files.items(0) );
  }

}
