import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromocionesLoginPage } from './promociones-login';

@NgModule({
  declarations: [
    PromocionesLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(PromocionesLoginPage),
  ],
})
export class PromocionesLoginPageModule {}
