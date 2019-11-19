import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage {
  userPic: any;
  constructor(
    public modalController: ModalController,
    public navParams: NavParams) {
    this.userPic = this.navParams.get('image');
  }

  close(){
    this.modalController.dismiss();
  }
}
