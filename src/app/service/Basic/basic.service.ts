import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController, Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import * as moment from 'moment';
import { AlertModule } from 'src/app/Module/alert/alert.module';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  baseUrl: any = 'https://www.avronhospitals.com/ekda/api/';
  loadingElement: any;
  deviceToken: any = '';
  deviceType: any = '';
  userId: any = '';

  // userData
  mobileNo: any;
  firstName: any;
  lastName: any;
  middleName: any;
  dob: any;
  address: any;
  city: any;
  state: any;
  pincode: any;
  county: any = 'India';
  email: any;
  profilePic: any;
  education: any;
  marital_status: any;
  occupation: any;
  phone_home: any;
  phone_office: any;
  phone_other: any;
  blood_group: any;
  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public storage: Storage,
    public platform: Platform,
    public navCtrl: NavController,
    public alertCtrl: AlertModule) {

  }

  hitApi(method: string, api: string, params: {}) {
    if (method == 'get') {
      return this.http.get(this.baseUrl + api, { headers: { Auth: localStorage.token == undefined ? '27ekda_auth' : localStorage.token } });
    } else if (method == 'post') {
      return this.http.post(this.baseUrl + api, params, { headers: { Auth: localStorage.token == undefined ? '27ekda_auth' : localStorage.token } });
    } else if (method == 'delete') {
      return this.http.delete(this.baseUrl + api, { headers: { Auth: localStorage.token == undefined ? '27ekda_auth' : localStorage.token } });
    }
  }

  getDeviceType() {
    if (this.platform.is('android')) {
      this.deviceType = 'Android';
    } else {
      this.deviceType = 'Ios';
    }
  }

  errorCall(error) {
    this.showToast(error.msg);
  }

  async showLoader() {
    this.loadingElement = await this.loadingCtrl.create({
      cssClass: 'custom-loader',
      spinner: 'circles'
    });

    return await this.loadingElement.present();
  }

  DismissLoader() {
    if (this.loadingElement) {
      this.loadingElement.dismiss();
    }

    // Multitple Loader not dismiss sometimes that's why this code can remove loader element from html if that not dismiss
    setTimeout(() => {
      $('.sc-ion-loading-ios-h').remove();
      $('.sc-ion-loading-md-h').remove();
    }, 1000);
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      mode: 'ios',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  setUserData(data) {
    localStorage.token = data.access_token;
    this.storage.set('userData', data);
    this.mobileNo = data.phone_no;
    this.firstName = data.first_name;
    this.middleName = data.middle_name;
    this.lastName = data.sur_name;
    this.email = data.email;
    this.address = data.address;
    this.dob = moment(data.dob);
    this.city = data.city;
    this.state = data.state;
    this.county = data.county;
    this.pincode = data.pin_code;
    this.profilePic = data.profile_pic;
    this.education = data.education;
    this.marital_status = data.marital_status;
    this.occupation = data.occupation;
    this.phone_home = data.phone_home;
    this.phone_office = data.phone_office;
    this.phone_other = data.phone_other;
    this.blood_group = data.blood_group;
  }

  async getUserData() {
    await this.storage.get('userData').then(data => {
      if (data != null) {
        this.userId = data.user_id;
        this.mobileNo = data.phone_no;
        this.firstName = data.first_name;
        this.middleName = data.middle_name;
        this.lastName = data.sur_name;
        this.email = data.email;
        this.address = data.address;
        this.dob = moment(data.dob);
        this.city = data.city;
        this.state = data.state;
        this.county = data.county;
        this.pincode = data.pin_code;
        this.profilePic = data.profile_pic;
        this.education = data.education;
        this.marital_status = data.marital_status;
        this.occupation = data.occupation;
        this.phone_home = data.phone_home;
        this.phone_office = data.phone_office;
        this.phone_other = data.phone_other;
        this.blood_group = data.blood_group;
      }
    });
  }

  authFail() {
    this.alertCtrl.showToast('Authentication Failed.', 'top', 5000);
    localStorage.removeItem('phoneNo');
    localStorage.removeItem('userID');
    this.storage.remove('userData');
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot(['/login'])
  }
}
