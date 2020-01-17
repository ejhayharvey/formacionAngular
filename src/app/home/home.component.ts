import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  cardsInFather: any[];


  constructor(
    private infoService: InfoService
  ) { }

  ngOnInit() {
    this.showInfo();
  }

  showInfo() {
    this.infoService.getInfo().subscribe((data: any) => {
      console.log(data, 'DATA');
      this.cardsInFather = data;

    });

  }


}
