import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-video',
  templateUrl: './search-video.component.html',
  styleUrls: ['./search-video.component.css']
})
export class SearchVideoComponent implements OnInit {

  @Input() src;
  @Input() show;
  
  constructor() { }

  ngOnInit(): void {
  }

}
