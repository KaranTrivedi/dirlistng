import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test-samples',
  templateUrl: './test-samples.component.html',
  styleUrls: ['./test-samples.component.css']
})
export class TestSamplesComponent implements OnInit
{
  @ViewChild('videoPlayer') videoplayer: any;
  videoSource = "http://192.168.0.16:8000/path/downloads/Haikyuu!!%20To%20The%20Top%202nd%20Season%20-%2001%20%5B10bit%20720p%5D.mkv";

  constructor() { }

  ngOnInit(): void
  {
  }

  onVideo(event)
  {
    console.log(event)
  }
  toggleVideo()
  {
    this.videoplayer.play();
  }
}
