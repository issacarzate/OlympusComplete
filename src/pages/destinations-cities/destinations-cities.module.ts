import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DestinationsCitiesPage } from './destinations-cities';

@NgModule({
  declarations: [
    DestinationsCitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(DestinationsCitiesPage),
  ],
})
export class DestinationsCitiesPageModule {}
