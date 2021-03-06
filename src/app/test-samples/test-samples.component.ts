import { Component, OnInit, ViewChild } from '@angular/core';
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
  // fileSelected($event) {
  //   var attachedFile = this.videoSource
  
  //   let duration:any;
  
  //   //here you can check the file type for attachedFile either video or audio
  
  //   var video = document.createElement('video');
  //   video.preload = 'metadata';
  
  //   video.onloadedmetadata = function() {
  //     window.URL.revokeObjectURL(video.src);
  //     duration = video.duration; // here you could get the duration
  //   }
  
  //   video.src = URL.createObjectURL(attachedFile);
  //   console.log(video.src)
  // }
}