import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'check-otp',
    loadChildren: './pages/check-otp/check-otp.module#CheckOtpPageModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/Profile/profile.module#ProfilePageModule',
  },
  {
    path: 'my-calendar',
    loadChildren: './pages/my-calendar/my-calendar.module#MyCalendarPageModule',
  },
  {
    path: 'donors',
    loadChildren: './pages/donors/donors.module#DonorsPageModule',
  },
  {
    path: 'filters',
    loadChildren: './pages/filters/filters.module#FiltersPageModule',
  },
  {
    path: 'feedback',
    loadChildren: './pages/feedback/feedback.module#FeedbackPageModule'
  },
  {
    path: 'contact-profile',
    loadChildren: './pages/contact-profile/contact-profile.module#ContactProfilePageModule'
  },
  {
    path: 'news-list',
    loadChildren: './pages/news-list/news-list.module#NewsListPageModule'
  },
  {
    path: 'news-list-detail-page',
    loadChildren: './pages/news-list-detail-page/news-list-detail-page.module#NewsListDetailPagePageModule'
  },
  {
    path: 'advertisement',
    loadChildren: './pages/advertisement/advertisement.module#AdvertisementPageModule'
  },
  {
    path: 'advertisement-popup',
    loadChildren: './pages/advertisement-popup/advertisement-popup.module#AdvertisementPopupPageModule'
  }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
