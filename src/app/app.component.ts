import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Events, IonRouterOutlet, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AlertModule } from './Module/alert/alert.module';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { BasicService } from './service/Basic/basic.service';
import { Storage } from '@ionic/storage';
import { FiltersPage } from './pages/filters/filters.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  public version: any = '';
  public userData: any;
  public appPages = [
    {
      title: 'Home',
      url: '/my-calendar',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Donors',
      url: '/donors',
      icon: 'wallet'
    },
    {
      title: 'Advertisement',
      url: '/advertisement',
      icon: 'at'
    },
    {
      title: 'News',
      url: '/news-list',
      icon: 'pricetag'
    },
    {
      title: 'Feedback',
      url: '/feedback',
      icon: 'create'
    }
  ];

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public router: Router,
    public alertModule: AlertModule,
    public navCtrl: NavController,
    private push: Push,
    public bs: BasicService,
    public storage: Storage,
    public event: Events,
    public modalController: ModalController
  ) {
    this.initializeApp();
    this.event.unsubscribe('setUserData');
    this.event.subscribe('setUserData', () => {
      this.setUserData();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (localStorage.token != undefined) {
        this.navCtrl.navigateRoot(['/my-calendar']);
      } else {
        this.navCtrl.navigateRoot(['/login']);
      }
      this.bs.getUserData();
      this.handleHardwareBackButton();
      this.pushNotifications();
      this.setUserData();
    });
  }

  openImage(val: any) {
    this.modalController.create({
      component: FiltersPage,
      componentProps: {
        image: val == null ? '../../assets/img/user.png' : val
      }
    }).then((modal: any) => {
      modal.present();
    })
  }

  handleHardwareBackButton() {
    this.platform.backButton.subscribe((event: any) => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/login') {
        navigator['app'].exitApp();
      } else {
        if(this.router.url === '/my-calendar'){
          this.alertModule.openConfirm('27 Ekda', 'Are you sure you want to exit ?', 'Exit', (res: any) => {
            if (res === "Success") {
              navigator['app'].exitApp();
            }
          });
        }
      }
    });
  }

  logout() {
    const data = {
      user_id: localStorage.userID,
      device_token: this.bs.deviceToken
    }
    this.bs.hitApi('post', 'user/log-out', data).subscribe((response: any) => {
      localStorage.removeItem('phoneNo');
      localStorage.removeItem('userID');
      this.storage.remove('userData');
      localStorage.removeItem('token');
    });
  }

  setUserData() {
    this.storage.get('userData').then(data => {
      this.userData = data;
    });
  }

  pushNotifications() {
    const options: PushOptions = {
      android: {
        senderID: '690486240690'
      },
      browser: {},
      ios: {
        sound: true,
        badge: true
      },
      windows: {},

    };

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('registration').subscribe((data: any) => {
      this.bs.deviceToken = data.registrationId;
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('Received a notification ' + JSON.stringify(data));
      var extraData = JSON.parse(JSON.stringify(data.additionalData));
      if (data.additionalData.foreground) {
        // if application open
        console.log('in foreground');

      } else {
      }
    });


    pushObject.on('error').subscribe(error => {
      console.error('Error with Push plugin' + JSON.stringify(error));
    });

  }
}
