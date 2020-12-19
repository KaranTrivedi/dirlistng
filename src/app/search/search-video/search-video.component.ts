import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-video',
  templateUrl: './search-video.component.html',
  styleUrls: ['./search-video.component.css']
})
export class SearchVideoComponent implements OnInit {

  // @Input() src;

  src: string;
  constructor() { }

  ngOnInit(): void {
    this.src = "http://192.168.0.15:DESKTOP-Q8UEATO/4. Videos/1. Movies/The.Tickle.King.2017.720p.AMZN.WEB-DL.DDP2.0.H.264-NTG.mkv"
  }

}
