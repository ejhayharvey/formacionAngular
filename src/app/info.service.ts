import { Injectable } from "@angular/core";
import { map, skipWhile, filter, tap } from "rxjs/operators";

import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppEvent } from "./models";

@Injectable({
  providedIn: "root"
})
export class InfoService {
  private infoUrl = "http://www.mocky.io/v2/5e173676300000b37dd56466";

  constructor(private http: HttpClient) {}

  getInfo(): Observable<AppEvent[]> {
    return this.http.get(this.infoUrl).pipe(map((x: any) => x.data));
  }

  getDetail(nom: string): Observable<AppEvent> {
    return this.http.get(this.infoUrl).pipe(
      map((x: any) => x.data),
      map((x: AppEvent[]) => {
        console.log("PArAMNOM", nom);
        return x.filter((x: AppEvent) => x.nom == nom)[0];
      })
    );
  }
}
