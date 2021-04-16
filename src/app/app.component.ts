import { Storage } from '@ionic/storage-angular';
import { Component, QueryList, ViewChildren } from '@angular/core';

import { Platform, NavController, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { AlertService } from "./services/alert.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  dark = false;
  selectedLanguage: string;
  navLinksArray = [];
  constructor(
    private storage: Storage,
    private platform: Platform,
    private navCtrl: NavController,
    private router: Router,
    private location: Location,
    private alert: AlertService
  ) {
    //this.backButtonEvent();
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }
  
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      navigator["app"].exitApp();
      // if (!this.routerOutlet.canGoBack()) {
      //   if (this.router.url === "/app/tabs/home") {
      //     this.backButtonAlert()
      //   } else if (this.router.url === "/login") {
      //     navigator["app"].exitApp();
      //   } else {
      //     this.location.back()
      //   }
      // } else {
      //   this.location.back()
      // }

    })
  }

  
  async backButtonAlert() {
    if (
      new Date().getTime() - this.lastTimeBackPress <
      this.timePeriodToExit
    ) {
      navigator["app"].exitApp();
    } else {
      this.alert.toast("Tekan tombol kembali sekali lagi untuk keluar.");

      this.lastTimeBackPress = new Date().getTime();
    }
  }


}
