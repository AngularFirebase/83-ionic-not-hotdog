import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisionPage } from './vision';

@NgModule({
  declarations: [
    VisionPage,
  ],
  imports: [
    IonicPageModule.forChild(VisionPage),
  ],
})
export class VisionPageModule {}
