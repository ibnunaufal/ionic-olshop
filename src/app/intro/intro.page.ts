import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  jumlahRakaat: number = 0;
  constructor(
    private storage: Storage,
    private router: Router
    ) { }

  ngOnInit() {
  }

  pilih(angka){
    console.log(angka+" Rakaat")
    this.jumlahRakaat = angka;
  }

  mulai(){
    if(this.jumlahRakaat == 0){
      console.log("masih kosong");
    }else{      
      this.storage.set("jumlah",this.jumlahRakaat);
      this.router.navigateByUrl("/home", { replaceUrl: true })
    }
    console.log("Jumlah Rakaat dipilih "+this.jumlahRakaat);
  }
}
