import { Component } from '@angular/core';
import { Platform, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AlertModule } from './Module/alert/alert.module';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { BasicService } from './service/Basic/basic.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
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
    public event: Events
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
      this.storage.get('userData').then(data => {
        if (data != null) {
          this.navCtrl.navigateRoot(['/my-calendar']);
        } else {
          this.navCtrl.navigateRoot(['/login']);
        }
      });
      this.bs.getUserData();
      this.handleHardwareBackButton();
      this.pushNotifications();
      this.setUserData();
    });
  }

  handleHardwareBackButton() {
    this.platform.backButton.subscribe((event: any) => {
      if (this.router.url === '/login') {
        navigator['app'].exitApp();
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
