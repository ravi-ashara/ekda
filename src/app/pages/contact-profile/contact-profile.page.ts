import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

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
    public navCtrl: NavController
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.data) {
        this.userData = params.data;
        this.userImage = params.data.image;
        console.log(this.userData);
      } else {
        this.navCtrl.pop();
      }
    });
  }

}
