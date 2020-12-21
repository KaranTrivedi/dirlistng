import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-search-video',
  templateUrl: './search-video.component.html',
  styleUrls: ['./search-video.component.css']
})
export class SearchVideoComponent implements OnInit {

  // @Input() src;

  src: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
