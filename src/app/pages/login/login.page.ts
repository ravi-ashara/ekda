import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModule } from '../../Module/alert/alert.module';
import { BasicService } from 'src/app/service/Basic/basic.service';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  public loginForm: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';
  constructor(
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public alertModule: AlertModule,
    public navCtrl: NavController,
    public bs: BasicService,
    public router: Router
  ) {
    this.menuCtrl.enable(false);
    this.loginForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  ionViewWillEnter() {
  }

  loginformSubmit() {
    try {
      const data = {
        phone_no: this.loginForm.value.phone
      };
      this.bs.showLoader();
      this.bs.hitAPINative('post', 'register', data).then((receivedData: any) => {
        this.bs.DismissLoader();
        let allData = JSON.parse(receivedData.data);
        if (allData.status) {
          const navigationExtras: NavigationExtras = {
            state: {
              user: allData.data
            }
          };
          this.router.navigate(['/check-otp'], navigationExtras);
        } else {
          if (allData.data.is_user_exist) {
            this.navCtrl.navigateRoot(['/my-calendar']);
          }
        }
      }).catch(error => {
        console.log(error);
        this.bs.DismissLoader();
      });
    } catch (error) {
      console.log(error);
      this.bs.DismissLoader();
    }
  }
}
