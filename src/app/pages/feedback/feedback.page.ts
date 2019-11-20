import { Component, OnInit } from '@angular/core';
import { BasicService } from '../../service/Basic/basic.service';
import { AlertModule } from '../../Module/alert/alert.module';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage {

  name: any = '';
  mobileNo: any = '';
  feedback: any = '';
  constructor(public bs: BasicService, public alert: AlertModule,public navCtrl: NavController) {
    this.bs.getUserData();
    this.name = this.bs.firstName + ' ' + this.bs.middleName + ' ' + this.bs.lastName;
    this.mobileNo = this.bs.mobileNo;
  }

  submit() {
    try {
      this.bs.showLoader();
      const data = {
        comment: this.feedback,
        user_id: localStorage.userID
      }
      this.bs.hitApi('post', 'user/feedback', data).subscribe((response: any) => {
        this.bs.DismissLoader();
        if (response.status) {
          this.alert.openAlert('27 Ekda', response.msg, 'OK').then(() => {
            this.navCtrl.navigateRoot(['/my-calendar']);
          });
        } else {
          if(response.msg == "Authentication Failed." || response.msg == "Authentication Failed"){
            this.bs.authFail();
          }else{
            this.alert.openAlert('27 Ekda', 'Opps something wrong..', 'OK');
          }
        }
      }, error => {
        this.alert.openAlert('27 Ekda', 'Error from server side..', 'OK');
        this.bs.DismissLoader();
      });
    } catch (error) {
      this.alert.openAlert('27 Ekda', 'Error from server side..', 'OK');
      this.bs.DismissLoader();
    }
  }
}
