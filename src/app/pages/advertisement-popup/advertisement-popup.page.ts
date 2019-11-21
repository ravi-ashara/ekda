import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AlertModule } from '../../Module/alert/alert.module';
import { BasicService } from '../../service/Basic/basic.service';

@Component({
  selector: 'app-advertisement-popup',
  templateUrl: './advertisement-popup.page.html',
  styleUrls: ['./advertisement-popup.page.scss'],
})
export class AdvertisementPopupPage {
  business: any = '';
  constructor(
    public modalCtrl: ModalController,
    public bs: BasicService,
    public alert: AlertModule,
    public navCtrl: NavController) { }

  closePopup() {
    this.modalCtrl.dismiss();
  }

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
            this.closePopup();
          });
        } else {
          this.closePopup();
          if (response.msg == "Authentication Failed." || response.msg == "Authentication Failed") {
            this.bs.authFail();
          } else {
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
