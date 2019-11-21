import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdvertisementPopupPage } from './advertisement-popup.page';

const routes: Routes = [
  {
    path: '',
    component: AdvertisementPopupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdvertisementPopupPage]
})
export class AdvertisementPopupPageModule {}
