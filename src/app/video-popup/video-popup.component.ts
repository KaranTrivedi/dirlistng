import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.css']
})
export class VideoPopupComponent implements OnInit {

  // @Input() src;

  src: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void
  {
    console.log(this.data)
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
