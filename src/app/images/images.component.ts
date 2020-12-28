import { HttpClient } from '@angular/common/http';
import { HostListener, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { environment } from 'src/environments/environment'
import { Directory } from '../interfaces';

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
  private swipeCoord?: [number, number];
  private swipeTime?: number;

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

  nextIndex()
  {
    if(this.index < this.images.files.length-1)
    {
      this.index += 1
    }
  }
  prevIndex()
  {
    if (this.index > 0)
    {
      this.index -= 1
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    console.log(event.key)
    if(event.key == "Insert")
    {
      this.box.nativeElement.focus();
    }
    if(event.key == ".")
    {
      this.onRandom()
    }
    if (event.key == "PageDown")
    {
      this.nextIndex()
    }
    if (event.key == "PageUp")
    {
      this.prevIndex()
    }
    if (event.key == "End")
    {
      this.index = this.images.files.length-1
    }
    if (event.key == "Home")
    {
      this.index = 0
    }
    this.setSource(this.index)
  }

  onPage(direction)
  {
    if (direction == "next")
    {
      this.nextIndex()
    }
    if (direction == "prev")
    {
      this.prevIndex()
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

  swipe(e: TouchEvent, when: string): void 
  {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();
  
    if (when === 'start')
    {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } 
    else if (when === 'end')
    {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
  
      if (duration < 2000 //
        && Math.abs(direction[0]) > 5 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3))
        { // Horizontal enough
          const swipe = direction[0] < 0 ? 'next' : 'previous';
          if(swipe == "previous")
          {
            this.prevIndex()
          }
          else
          {
            this.nextIndex()
          }
          this.setSource(this.index)
      }
    }
  }
  sortData(event)
  {
    this.column = event.active
    this.sort = event.direction
    this.getImages()
  }

  setSource(index)
  {
    this.imageSource = `${this.API_URL}directory/${this.PATH}${this.images.files[index].name}`
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

  onDownload()
  {
    this.apiService.Download(this.images.files[this.index].name, this.PATH)
  }

  onToggle()
  {
    this.apiService.navToggle();
  }

  onSearchChange(value)
  {
    this.query = value.trim().toLowerCase();
    this.getImages()
  }

  private getImages()
  {
    const requestUrl =
    `${this.API_URL}directory/${this.PATH}?&column=${this.column}&sort=${this.sort}&query=${this.query}`;

    this.http.get<Directory>(requestUrl,
    {
    })
    .subscribe(posts => {
      this.images = posts;
      this.setSource(0)
      if (this.images.lenght === 0)
      {
        this.onSearchChange("")
      }
  })
  }
}

function getRandomInt(max)
{
  return Math.floor(Math.random() * Math.floor(max));
}
