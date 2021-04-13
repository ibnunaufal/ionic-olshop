import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  count: number= 0;
  rakaat: number= 0;
  batas: number= 0;
  constructor(
    private alertCtrl: AlertController
  ) {
    this.setRakaat();
  }

  click(){
    console.log("hei");
    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;
        console.log('Single Tap');
        this.rakaat = this.rakaat + 2;
        if(this.rakaat == this.batas){
          this.double(1);
        }
      }if(this.count > 1){
        this.count = 0;
        console.log('Double Tap');
        this.double(0);
      }
    }, 500);
  }

  async setRakaat(){
    const confirm = this.alertCtrl.create({ 
      message: "Pilih Jumlah Rakaat",
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: '20',
          value: '20',
          handler: () => {
            this.batas = 20;
          }
        },
        {
          name: 'radio2',
          type: 'radio',
          label: '8',
          value: '8',
          handler: () => {
            this.batas = 8;
          }
        }
      ],
      buttons: [
        {
          text: 'Exit',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');

          }
        }
      ],
      backdropDismiss: false
    });

    console.log(this.batas);

    (await confirm).present();
  }

  async double(type){
    if(type==1){
      var kalimat="Alhamdulillah Sudah Selesai";
    }else{
      var kalimat="Menu";
    }
    const confirm = this.alertCtrl.create({      
      message: kalimat,
      buttons: [
        {
          text: "Cancel",
          handler: () => {}
        },
        {
          text: "Reset Count",
          handler: () => {
            this.rakaat=0;
          }
        },
        {
          text: "Set Rakaat",
          handler: () => {
            this.alertCtrl.dismiss();
            this.setRakaat;
          }
        },
        {
          text: "Exit",
          handler: () => {
            console.log("asd");
          }
        }
      ]
    });

    (await confirm).present();
  }

}
