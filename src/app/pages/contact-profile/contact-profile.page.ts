import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { FiltersPage } from '../filters/filters.page';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.page.html',
  styleUrls: ['./contact-profile.page.scss'],
})
export class ContactProfilePage {

  public userImage: any;
  // public profileForm: FormGroup;
  public profileData: any;
  public phno: any;
  userData: any = {};
  constructor(
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public modalController: ModalController
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.data) {
        this.userData = params.data;
        this.userImage = params.data.image == null ? '../../../assets/img/user.png' : params.data.image;
      } else {
        this.navCtrl.pop();
      }
    });
  }

  openImage(val: any) {
    this.modalController.create({
      component: FiltersPage,
      componentProps: {
        image: val
      }
    }).then((modal: any) => {
      modal.present();
    })
  }
}
