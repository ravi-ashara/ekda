import { Component, OnInit } from '@angular/core';
import { BasicService } from 'src/app/service/Basic/basic.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { AlertModule } from 'src/app/Module/alert/alert.module';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.page.html',
  styleUrls: ['./news-list.page.scss'],
})
export class NewsListPage {
  public newsData: any;

  constructor(
    public bs: BasicService,
    public navCtrl: NavController,
    public router: Router,
    public alert: AlertModule
  ) { }

  ionViewWillEnter(){
    this.getNewsData();
  }
  getNewsData() {
    this.bs.showLoader();
    const data = {
      user_id: localStorage.userID
    }
    this.bs.hitApi('post', 'user/news-list', data).subscribe((receivedData: any) => {
      this.bs.DismissLoader();
      if (receivedData.status) {
        this.newsData = receivedData.data.news_lists;
      } else {
        if(receivedData.msg == "Authentication Failed." || receivedData.msg == "Authentication Failed"){
          this.bs.authFail();
        }else{
          this.alert.openAlert('27 Ekda', 'Opps something wrong..', 'OK');
        }
      }
    }, error => {
      this.bs.DismissLoader();
      this.alert.openAlert('27 Ekda', 'Error from server side..', 'OK');
    })
  }

  openNewsDetail(detail: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        news: detail
      }
    };
    this.router.navigate(['/news-list-detail-page'], navigationExtras);
  }
}
