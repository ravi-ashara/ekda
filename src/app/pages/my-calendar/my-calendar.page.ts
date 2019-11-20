import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { BasicService } from 'src/app/service/Basic/basic.service';
@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.page.html',
  styleUrls: ['./my-calendar.page.scss']
})
export class MyCalendarPage {
  public filterData: boolean = false;
  public searchKey: any = '';
  public dummy: any = '';
  public userData: any;
  public filterSelectedData = {
    is_filter: true,
    gender: '',
    pincode: '',
    city: '',
    user_id: localStorage.userID
  }
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public bs: BasicService
  ) {
    this.menuCtrl.enable(true);
    this.getUserList();
  }

  getUserList() {
    this.bs.showLoader();
    const data = {
      user_id: localStorage.userID
    }
    this.bs.hitApi('post', 'user/user-list', data).subscribe((receivedData: any) => {
      this.bs.DismissLoader();
      if(receivedData.status){
        this.userData = receivedData.data.user_list;
      }else{
        if(receivedData.msg == "Authentication Failed." || receivedData.msg == "Authentication Failed"){
          this.bs.authFail();
        }
      }
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.dummy = this.userData;
  }

  filterPage() {
    this.filterData = !this.filterData;
    if(!this.filterData){
      this.getUserList();
    }
  }

  filterUserList() {
    try {
      this.bs.showLoader();
      this.bs.hitApi('post', 'user/user-list', this.filterSelectedData).subscribe((receivedData: any) => {
        this.bs.DismissLoader();
        if(receivedData.status){
          this.userData = receivedData.data.user_list;
        }else{
          if(receivedData.msg == "Authentication Failed." || receivedData.msg == "Authentication Failed"){
            this.bs.authFail();
          }
        }
      }, error => {
        this.bs.DismissLoader();
        console.log(error);
      });
    } catch (error) {
      this.bs.DismissLoader();
      console.log(error);
    }
  }

  profile(list: any) {
    this.navCtrl.navigateForward('contact-profile', {
      queryParams: {
        data: list
      }
    });
  }

  searchProduct(searchKey) {
    this.userData = this.userData.filter(d => d.fname.toLowerCase().includes(searchKey.toLowerCase()));
  }

  closeSearch() {
    this.searchKey = '';
    this.userData = this.dummy;
  }
}
