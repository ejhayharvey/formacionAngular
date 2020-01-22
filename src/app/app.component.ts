import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { RegisterFormService } from "./register-form.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  name: string;
  subscription: Subscription;

  constructor(private registerService: RegisterFormService) {
    this.subscription = this.registerService.getInfo().subscribe(data => {
      if (data) {
        this.name = data;
      } else {
        this.name = "";
      }
    });
  }

  ngOnInit() {}
}
