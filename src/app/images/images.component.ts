import { HttpClient } from '@angular/common/http';
import { HostListener, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { Shows } from '../directory/shows';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit
{
  @ViewChild("box") box;

  images: any;

  private API_URL= environment.API_URL;

  imageSource: string;

  query:string ="";
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
    if(event.key == ".")
    {
      this.onRandom()
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
  sortData(event)
  {
    this.column = event.active
    this.sort = event.direction
    this.getImages()
  }

  setSource(index)
  {
    this.imageSource = `${this.API_URL}path/${this.PATH}${this.images.files[index].name}`
  }

  onClickImage(index)
  {
    this.index = index
    this.setSource(this.index)
  }

  onRandom()
  {
    this.index = getRandomInt(this.images.files.length-1)
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
    `${this.API_URL}path/archives/1.%20Movies/dimid/img/?&column=${this.column}&sort=${this.sort}&query=${this.query}`;

    this.http.get<Shows>(requestUrl,
    {
    })
    .subscribe(posts => {
      this.images = posts;
      this.setSource(0)
  })
  }
}

function getRandomInt(max)
{
  return Math.floor(Math.random() * Math.floor(max));
}
