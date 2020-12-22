import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{
  @ViewChild('sidenav') sidenav;

  title = 'dirlistng';

  constructor(private apiService: ApiService)
  {

  }
  ngOnInit()
  {
    if(this.apiService.subVar == undefined)
    {
      this.apiService.subVar = this.apiService.invokeToggleFunction.subscribe(() => {
        this.toggleNav()
      });
    }
  }

  toggleNav()
  {
    this.sidenav.toggle()
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    if(event.key == "`")
    {
      this.toggleNav()
    }
  }
}
