import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsListDetailPagePage } from './news-list-detail-page.page';

const routes: Routes = [
  {
    path: '',
    component: NewsListDetailPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsListDetailPagePage]
})
export class NewsListDetailPagePageModule {}
