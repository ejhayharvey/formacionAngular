import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InfoService } from "../info.service";

@Component({
  selector: "app-component-detail",
  templateUrl: "./component-detail.component.html",
  styleUrls: ["./component-detail.component.scss"]
})
export class ComponentDetailComponent implements OnInit {

  details: any;

  constructor(
    private route: ActivatedRoute,
    private infoService: InfoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      const par = params['component-detail'];
      this.showInfoDetail(par);
    })
  }

  showInfoDetail(par) {
    this.infoService.getDetail(par).subscribe((data: any) => {
      this.details = data;
      console.log(this.details, 'details');
    });
  }
}
