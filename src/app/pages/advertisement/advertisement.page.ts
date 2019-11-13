import { Component, OnInit } from '@angular/core';
import { BasicService } from 'src/app/service/Basic/basic.service';
import { AlertModule } from 'src/app/Module/alert/alert.module';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.page.html',
  styleUrls: ['./advertisement.page.scss'],
})
export class AdvertisementPage {

  business: any = '';
  constructor(
    public bs: BasicService,
    public alert: AlertModule,
    public navCtrl: NavController
  ) { }

  submit() {
    try {
      this.bs.showLoader();
      const data = {
        business_name: this.business,
        user_id: localStorage.userID,
        contact_no: this.bs.mobileNo
      };
      this.bs.hitApi('post', 'user/advertisement', data).subscribe((response: any) => {
        this.bs.DismissLoader();
        if (response.status) {
          this.alert.openAlert('27 Ekda', response.msg, 'OK').then(() => {
            this.navCtrl.navigateRoot(['/my-calendar']);
          });
        } else {
          this.alert.openAlert('27 Ekda', 'Opps something wrong..', 'OK');
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
