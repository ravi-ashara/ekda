
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { Base64 } from '@ionic-native/base64/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Push } from '@ionic-native/push/ngx';

/** Modules */
import { AlertModule } from './Module/alert/alert.module';
import { LoaderModule } from './Module/loader/loader.module';
import { ActionSheetModule } from './Module/action-sheet/action-sheet.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

/** Pipes */
import { PipesModule } from './pipes/pipes.module';
import { FiltersPageModule } from './pages/filters/filters.module';
import { AdvertisementPopupPageModule } from './pages/advertisement-popup/advertisement-popup.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  exports: [FormsModule],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    LoaderModule,
    ActionSheetModule,
    HttpClientModule,
    AngularMultiSelectModule,
    FiltersPageModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    PipesModule,
    AdvertisementPopupPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Crop,
    Base64,
    Push,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
