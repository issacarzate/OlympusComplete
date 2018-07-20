import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DestinationsPage } from './destinations';

@NgModule({
  declarations: [
    DestinationsPage,
  ],
  imports: [
    IonicPageModule.forChild(DestinationsPage),
  ],
})
export class DestinationsPageModule {}
