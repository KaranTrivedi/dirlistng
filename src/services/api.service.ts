
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class ApiService
{
  private static API_URL: string = 'http://192.168.0.16:8000/';
  setDays$: Observable<any>;
  setAppcodes$: Observable<any>;
  urlAddress = ApiService.API_URL;

  private daysSubject = new BehaviorSubject<any>({});
  private appcodesSubject = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
    this.setDays$ = this.daysSubject.asObservable();
    this.setAppcodes$ = this.appcodesSubject.asObservable();
  }

  getApiUrl()
  {
    return ApiService.API_URL;
  }

  setDays(days) {
    this.daysSubject.next(days);
  }

  setAppcodes(appcodes) {
    this.appcodesSubject.next(appcodes);
  }

  Download(file, path)
  {
    // file = encodeURIComponent(file);
    const requestUrl = `${ApiService.API_URL}path/${path}${file}`

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
    return this.http.get(this.createCompleteRoute(route, this.urlAddress));
  };

  // public postData = (route: string) => {
  //   return this.http.post(this.createCompleteRoute(route, this.urlAddress));
  // }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  };
}

