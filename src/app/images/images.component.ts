import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shows } from '../directory/shows';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit
{

  images: any;
  file: any;
  currentFile: string;
  url;

  // QueryParams
  params;
  path;
  sort;
  column;
  index = 0;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit()
  {
    this.params = this.route.queryParams.subscribe(params => {
      this.sort = params["sort"] || "desc"
      this.column = params["column"] || "modify_time"
      this.getShows()
    })
  }
  
  onClickImage(file, index)
  {
    this.file = file
    this.currentFile = file.name
    this.index = index
    this.url = "http://192.168.0.16:8000/path/archives/1.%20Movies/dimid/img/" + this.file.name

  }

  private getShows()
  {
    // console.log(this.path)
    this.http.get<Shows>("http://192.168.0.16:8000/path/archives/1.%20Movies/dimid/img/?&column=" + this.column + "&sort=" + this.sort,
    {
    })
    .subscribe(posts => {
      this.images = posts;
      this.file = this.images.files[this.index]
      this.currentFile = this.images.files[this.index].name
      this.url = "http://192.168.0.16:8000/path/archives/1.%20Movies/dimid/img/" + this.file.name
  })
  }
}
