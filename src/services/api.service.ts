
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable(
  {
    providedIn: 'root'
  }
)

export class ApiService
{
  setAppcodes$: Observable<any>;

  private API_URL= environment.API_URL;

  invokeToggleFunction = new EventEmitter();
  subVar: Subscription;

  constructor(private http: HttpClient)
  {

  }

  getApiUrl()
  {
    return this.API_URL;
  }

  navToggle()
  {
    this.invokeToggleFunction.emit();
  }

  // setAppcodes(appcodes) {
  //   this.appcodesSubject.next(appcodes);
  // }

  Download(path, file)
  {
    const requestUrl = `${this.API_URL}/directory/file/${path}${file}`

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

