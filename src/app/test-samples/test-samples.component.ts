import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-samples',
  templateUrl: './test-samples.component.html',
  styleUrls: ['./test-samples.component.css']
})
export class TestSamplesComponent implements OnInit
{

  links = []
  constructor()
  {}

  @HostListener('document:keydown', ['$event'])
  handleKBEvent(event: KeyboardEvent)
  {
      console.log(event.key)
  }

  ngOnInit()
  {

  }

  onVideo(event)
  {
    console.log(event)
  }

  onSeeked(event)
  {
    console.log(event)
  }
  onSeeking(event)
  {
    console.log(event)
  }
}