
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable(
  {
    providedIn: 'root'
  }
)

export class ApiService
{
  setDays$: Observable<any>;
  setAppcodes$: Observable<any>;

  private API_URL= environment.API_URL;

  private daysSubject = new BehaviorSubject<any>({});
  private appcodesSubject = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
    this.setDays$ = this.daysSubject.asObservable();
    this.setAppcodes$ = this.appcodesSubject.asObservable();
  }

  getApiUrl()
  {
    return this.API_URL;
  }

  setDays(days) {
    this.daysSubject.next(days);
  }

  setAppcodes(appcodes) {
    this.appcodesSubject.next(appcodes);
  }

  Download(file, path)
  {
    const requestUrl = `${this.API_URL}path/${path}${encodeURIComponent(file)}`

    this.http.get(requestUrl, {
      responseType: 'blob',
    }
    ).subscribe(response => this.downLoadFile(response, "application/octet-stream", file));
  }

  downLoadFile(data: any, type: string, file)
  {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.download = file;
    anchor.href = url;
    anchor.click();
  }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, this.API_URL));
  };

  // public postData = (route: string) => {
  //   return this.http.post(this.createCompleteRoute(route, this.urlAddress));
  // }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  };
}

