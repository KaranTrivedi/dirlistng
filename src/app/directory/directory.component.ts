import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shows } from './shows';
// import { FileService } from './files.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service'

@Component({
  selector: 'app-downloads',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})

export class DirectoryComponent implements OnInit {
  @ViewChild("box") box;

  shows: any;
  // path_vars: string[] = [""];
  file: string// = [""]

  fileToUpload: File = null;

  videoSource: string;
  today = new Date(new Date().setHours(0,0,0,0)).getTime();

  api_url;
  // QueryParams
  params;
  path;
  sort;
  column;

  query="";

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit()
  {
    this.api_url = this.apiService.getApiUrl();
    this.params = this.route.queryParams.subscribe(params => {
      this.path = params["path"] || ""
      this.sort = params["sort"] || "desc"
      this.column = params["column"] || "modify_time"
      this.getShows()
    })
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    console.log(event.key)
    if(event.key == "/")
    {      
      this.box.nativeElement.focus();
    }
  }

  handleFileInput(files: FileList)
  {
    this.fileToUpload = files.item(0);
  }
  // uploadFileToActivity() {
  //   this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
  //     // do something, if upload success
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  onClickShows(folder)
  {
    folder = encodeURIComponent(folder)
    this.path = this.path + folder + "/"
    this.navCall()
  }
  onDownload(file)
  {
    this.apiService.Download(file, this.path)
  }

  onView(file)
  {
    file = encodeURIComponent(file);
    this.videoSource = `${this.api_url}path/${this.path}${file}`
    // Launch component.
  }

  onNav(i)
  {
    if (i == -1)
    {
      path = ""
    }
    else
    {
      var path = ""
      for (var x = 0; x <= i; x++) {
        path = path + encodeURIComponent(this.shows.path_vars[x]) + "/"
      }
    }

    this.path = path
    this.navCall()
  }

  onSearchChange(value)
  {
    this.query = value.trim().toLowerCase();
    this.getShows()
  }

  sortData(event)
  {
    this.column = event.active
    this.sort = event.direction
    this.navCall()
  }

  navCall()
  {
    this.router.navigate(['directory'], { queryParams: { path: this.path, sort: this.sort, column: this.column } });
  }

  private getShows()
  {
    const requestUrl =
      `${this.api_url}path/${this.path}?&column=${this.column}&sort=${this.sort}&query=${this.query}`;
      // return this._httpClient.get<Alert_List>(requestUrl);

      this.http.get<Shows>(requestUrl, {
      })
        .subscribe(posts => {
          this.shows = posts;
          if (!this.shows.valid) {
            this.path = ""
            this.navCall()
          }
        })
  }
}
