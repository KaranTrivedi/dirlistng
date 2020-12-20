import { HttpClient } from '@angular/common/http';
import { HostListener, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { Shows } from '../directory/shows';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit
{
  @ViewChild("box") box;

  images: any;
  file: any;
  currentFile: string;
  url;
  api_url;

  imageSource: string;

  query=".";
  PATH = "archives/1.%20Movies/dimid/img/"

  // QueryParams
  params;
  path: string;
  sort: string;
  column: string;
  index: number = 0;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit()
  {
    this.api_url = this.apiService.getApiUrl();
    this.params = this.route.queryParams.subscribe(params => {
      this.sort = params["sort"] || "desc"
      this.index = params["index"] || 0
      this.column = params["column"] || "modify_time"
      this.getImages()
    })
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    if(event.key == "/")
    {      
      this.box.nativeElement.focus();
    }

    if (event.key == "=")
    {
      if(this.index < this.images.files.length-1)
      {
        this.index += 1
      }
    }
    if (event.key == "-")
    {
      if (this.index > 0)
      {
        this.index -= 1
      }
    }
    if (event.key == "]")
    {
      this.index = this.images.files.length-1
    }
    if (event.key == "[")
    {
      this.index = 0
    }
    this.setSource(this.index)
  }

  onPage(direction)
  {
    if (direction == "next")
    {
      if(this.index < this.images.files.length-1)
      {
        this.index += 1
      }
    }
    if (direction == "prev")
    {
      if (this.index > 0)
      {
        this.index -= 1
      }
    }
    if (direction == "last")
    {
      this.index = this.images.files.length-1
    }
    if (direction == "first")
    {
      this.index = 0
    }
    this.setSource(this.index)
  }

  setSource(index)
  {
    this.imageSource = `${this.api_url}path/${this.PATH}${this.images.files[index].name}`
    this.file = this.images.files[index]
  }

  onClickImage(file, index)
  {
    this.currentFile = file.name
    this.index = index
    this.setSource(this.index)
  }

  onDownload(file)
  {
    console.log(file)
    this.apiService.Download(this.images.files[this.index].name, this.PATH)
  }

  onSearchChange(value)
  {
    this.query = value.trim().toLowerCase();
    this.getImages()
  }

  private getImages()
  {
    const requestUrl =
    `${this.api_url}path/archives/1.%20Movies/dimid/img/?&column=${this.column}&sort=${this.sort}&query=${this.query}`;

    this.http.get<Shows>(requestUrl,
    {
    })
    .subscribe(posts => {
      this.images = posts;
      this.setSource(0)
  })
  }
}
