import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdvertisementPopupPage } from '../advertisement-popup/advertisement-popup.page';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.page.html',
  styleUrls: ['./advertisement.page.scss'],
})
export class AdvertisementPage {
  constructor(public modalCtrl: ModalController) { }
  advertisementPopup() {
    this.modalCtrl.create({
      component: AdvertisementPopupPage
    }).then((modal: any) => {
      modal.present();
    })
  }
}
