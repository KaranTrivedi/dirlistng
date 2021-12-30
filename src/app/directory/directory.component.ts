import { Component, OnInit, ElementRef, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Directory } from 'src/app/interfaces'
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service'
import { VideoPopupComponent } from '../video-popup/video-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'src/environments/environment'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-downloads',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DirectoryComponent implements OnInit
{
  @ViewChild("box") box;

  add: boolean = false;
  disabled: boolean;

  copy_name:string = "";
  copy_response;
  copying: boolean;

  dl_response;
  validateForm: FormGroup;

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
    private dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit()
  {
    this.disabled = false;
    // this.add = false;
    this.copying = false;
    this.validateForm = this.fb.group({
      url: [null, [Validators.required]],
      name: [null, [Validators.required]]
    });

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

        // data: `${this.API_URL}/directory1/${this.path}/${file}`,
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
    setName(filename)
    {
      this.copy_name = filename.replace(/\./g,' ')
    }
    resetForm()
    {
      this.validateForm.reset();
      this.dl_response = "";
    }
    onCopy(filename)
    {
      this.copying = true;
      const requestUrl =
        `${this.API_URL}/directory/copy_file/${this.path}?&destname=${this.copy_name}&filename=${filename}`;

      this.http.get(requestUrl, {
      })
        .subscribe(data => {
          this.copy_response = data;
          this.copying = false;
        })
    }
    toggleAdd()
    {
      this.add = !this.add
    }
    putVideo()
    {
      this.dl_response=""
      this.disabled = true;
      var url = this.validateForm.value.url
      var name = ""
      if (this.validateForm.value.name)
      {
        name = this.validateForm.value.name
      }

      const requestUrl =
        `${this.API_URL}/directory/youtube-dl/${this.path}?&name=${name}&url=${url}`;

      this.http.get(requestUrl, {
      })
        .subscribe(data => {
          this.dl_response = data;
          this.disabled = false;
          this.getDirectory()
        })
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
