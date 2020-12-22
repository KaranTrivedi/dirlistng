import { Component, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  @ViewChild('sidenav') sidenav;

  title = 'dirlistng';
  isShowing:boolean = false;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    if(event.key == "`")
    {
      this.sidenav.toggle()
    }
  }
  toggleSidenav()
  {
    this.isShowing = !this.isShowing;
  }
}
