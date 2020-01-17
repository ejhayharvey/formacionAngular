import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { take, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RegisterFormService {
  private subject = new Subject<string>();

  memory = { name: "", email: "", password: "", confirmPassword: "" };

  private urlApi = "http://localhost:8000";

  constructor(private http: HttpClient) {}

  sendDataForm(data: any) {
    var body = data;
    console.log(data, "data");

    var headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(this.urlApi + "/register", body, {
        headers: headers
      })
      .pipe(
        take(1),
        tap(x => console.log("entramos en tap"))
      );
  }

  sendInfo(info: string) {
    this.subject.next(info);
  }

  getInfo(): Observable<any> {
    return this.subject.asObservable();
  }
}
