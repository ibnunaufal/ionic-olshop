import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  count: number= 0;
  rakaat: number= 0;
  batas;
  constructor(
    private alertCtrl: AlertController,
    private storage: Storage,
    private router: Router
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
        this.storage.set("rakaat", this.rakaat);
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
    this.storage.get("jumlah").then((res)=>{
      if(res){
        this.batas = res;
      }
    })
    
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
            this.storage.set("rakaat", 0);
          }
        },
        {
          text: "Back to home",
          handler: () => {
            this.storage.set("rakaat", 0);
            this.storage.set("jumlah", 0);
            this.router.navigateByUrl("/intro", { replaceUrl: true })
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
