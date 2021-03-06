import { Component, OnInit, ElementRef, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Directory } from 'src/app/interfaces'
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service'
import { VideoPopupComponent } from '../video-popup/video-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-downloads',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DirectoryComponent implements OnInit
{
  @ViewChild("box") box;

  shows: any;
  // path_vars: string[] = [""];
  file: string// = [""]

  fileToUpload: File = null;

  videoSource: string;
  today = new Date(new Date().setHours(0,0,0,0)).getTime();

  private API_URL= environment.API_URL;
  // QueryParams
  params;
  path;
  sort;
  column;

  query="";

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private dialog: MatDialog) { }

  ngOnInit()
  {
    this.path = Object.values(this.route.snapshot.params).join("/")

    this.params = this.route.queryParams.subscribe(params => {
      // this.path = params["path"] || ""
      this.sort = params["sort"] || "desc"
      this.query = params["query"] || ""
      this.column = params["column"] || "modify_time"
      this.getDirectory()
    })
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    if(event.key == "Insert")
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

  onToggle()
  {
    this.apiService.navToggle()
  }

  onClickShows(folder)
  {
    this.path = this.path + "/" + folder
    this.query = ""
    this.navCall()
  }
  onDownload(file)
  {
    this.apiService.Download(this.path + "/", file)
  }

  onView(file)
  {
    this.file = file;
    //   const dialogConfig1 = new MatDialogConfig();

    this.dialog.open(VideoPopupComponent,
      {
        data: `${this.API_URL}/directory/file/${this.path}/${file}`,
        height: '100%',
        width: '100%'
      });
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
        path = path + this.shows.path_vars[x] + "/"
      }
    }

    this.path = path
    this.navCall()
  }

  onSearchChange(value)
  {
    this.query = value.trim().toLowerCase();
    this.navCall()
  }

  sortData(event)
  {
    this.column = event.active
    this.sort = event.direction
    this.navCall()
  }

  navCall()
  {
    // this.router.navigate(['directory'], { queryParams: { path: this.path, sort: this.sort, column: this.column, query: this.query } });
    this.router.navigate(
      [`directory/${this.path}`],
      {
        queryParams:
        {
          sort: this.sort,
          column: this.column,
          query: this.query
        }
      });
  }

  private getDirectory()
  {
    const requestUrl =
      `${this.API_URL}/directory/folder/${this.path}?&column=${this.column}&sort=${this.sort}&query=${this.query}`;

      this.http.get<Directory>(requestUrl, {
      })
        .subscribe(posts => {
          this.shows = posts;
          if (!this.shows.valid)
          {
            this.path = ""
            this.navCall()
          }
        })
  }
}
