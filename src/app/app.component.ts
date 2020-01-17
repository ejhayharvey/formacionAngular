import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { RegisterFormService } from './register-form.service';
import { ActivatedRoute } from '@angular/router';

//import { cards, Icard } from './cards';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  //suscribirme al subject
  name: string;
  subscription: Subscription;

  constructor(private registerService: RegisterFormService) {
    this.subscription = this.registerService.getInfo().subscribe(data => {
      if (data) {
        this.name = data;
        //console.log(data, 'DATA APP');

      } else {
        this.name = '';
      }
      //console.log(data, 'MESSAGES');
    });
  }

  ngOnInit(){

  }
}


  /*showInfoDetail(par) {
    this.infoService.getDetail(par).subscribe((data: any) => {
      this.details = data;
      console.log(this.details, 'details');
    });
  }*/

