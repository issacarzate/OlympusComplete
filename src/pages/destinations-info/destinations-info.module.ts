import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DestinationsInfoPage } from './destinations-info';

@NgModule({
  declarations: [
    DestinationsInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DestinationsInfoPage),
  ],
})
export class DestinationsInfoPageModule {}
