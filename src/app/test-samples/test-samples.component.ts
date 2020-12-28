import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-samples',
  templateUrl: './test-samples.component.html',
  styleUrls: ['./test-samples.component.css']
})
export class TestSamplesComponent implements OnInit
{
  @ViewChild('videoPlayer') videoplayer: any;
  videoSource = "http://192.168.0.16:8000/path/downloads/Haikyuu!!%20To%20The%20Top%202nd%20Season%20-%2001%20%5B10bit%20720p%5D.mkv";

  // Roue test params.
  params: any;
  path;
  sort;
  query;
  column;
  // Roue test params.

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit()
  {
    // console.log(this.route.snapshot.params)
    this.path = Object.values(this.route.snapshot.params).join("/")
    this.params = this.route.queryParams.subscribe(params => {
    this.sort = params["sort"] || "desc"
    this.column = params["column"] || "modify_time"
    // this.getDirectory()
    })
    console.log(this.path)
  }
  navCall()
  {
    //                   [`directory/${this.path}`]
    this.router.navigate(['directory'], { queryParams: { path: this.path, sort: this.sort, column: this.column, query: this.query } });
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
