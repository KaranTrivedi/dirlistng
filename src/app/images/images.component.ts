import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shows } from '../downloads/shows';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit
{

  shows: any;
  file: any;
  currentFile: string;
  url;

  // QueryParams
  params;
  path;
  sort;
  column;
  index = 1;

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
  }
  
  private getShows() {
    // console.log(this.path)
    this.http.get<Shows>("http://192.168.0.16:8000/shows/folders?ui_path=data/archives/1.%20Movies/dimid/img&column=" + this.column + "&sort=" + this.sort,
    {
    })
    .subscribe(posts => {
      this.shows = posts;
      this.file = this.shows.files[1]
      this.currentFile = this.shows.files[1].name
    })
  }
}
