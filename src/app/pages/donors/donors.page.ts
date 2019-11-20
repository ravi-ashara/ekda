import { Component } from '@angular/core';
import { BasicService } from 'src/app/service/Basic/basic.service';
import { AlertModule } from '../../Module/alert/alert.module';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.page.html',
  styleUrls: ['./donors.page.scss'],
})
export class DonorsPage {

  public donorData: any;

  constructor(public bs: BasicService,public alert: AlertModule) {
    this.getDonorList();
  }

  getDonorList() {
    try {
      this.bs.showLoader();
      const data = {
        user_id: localStorage.userID
      }
      this.bs.hitApi('post', 'user/donor-list', data).subscribe((receivedData: any) => {
        this.bs.DismissLoader();
        if (receivedData.status) {
          this.donorData = receivedData.data.donor_lists;
        } else {
          if(receivedData.msg == "Authentication Failed." || receivedData.msg == "Authentication Failed"){
            this.bs.authFail();
          }else{
            this.alert.openAlert('27 Ekda', 'Opps something wrong..', 'OK');
          }
        }
      },error => {
        this.bs.DismissLoader();
        this.alert.openAlert('27 Ekda', 'Error from server side..', 'OK');
      });
    } catch (error) {
      console.log(error);
      this.bs.DismissLoader();
    }
  }
}
