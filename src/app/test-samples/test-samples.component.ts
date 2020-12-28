import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-samples',
  templateUrl: './test-samples.component.html',
  styleUrls: ['./test-samples.component.css']
})
export class TestSamplesComponent implements OnInit
{
  @ViewChild('videoPlayer') videoplayer: any;
  videoSource = "http://192.168.0.16:8000/path/downloads/Haikyuu!!%20To%20The%20Top%202nd%20Season%20-%2001%20%5B10bit%20720p%5D.mkv";

  params: any;
  path;

  constructor(
    private route: ActivatedRoute,) { }

  ngOnInit()
  {
    // this.path.push(this.route.snapshot.paramMap.get('id1'))
    // this.path.push(this.route.snapshot.paramMap.get('id2'))
    // this.path.push(this.route.snapshot.paramMap.get('id3'))

    console.log(this.route.snapshot.params)
    this.path = Object.values(this.route.snapshot.params).join("/")

    // this.params = this.route.queryParams.subscribe(params => {
    //   this.path += params["id1"]
    //   this.path += params["id2"]
    //   this.path += params["id3"]
    // })
    console.log(this.path)
  }

  transform(value, args:string[]) : any {
    let arr = [];
    for (let key in value) {
      arr.push({key: key, value: value[key]});
    }
    return arr;
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
