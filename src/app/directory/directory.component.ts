import { Component, OnInit, ElementRef, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Directory } from 'src/app/interfaces'
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service'
import { VideoPopupComponent } from '../video-popup/video-popup.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { environment } from 'src/environments/environment'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-downloads',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DirectoryComponent implements OnInit
{
  @ViewChild("box") box;

  progress = 0;

  disabled: boolean;
  
  loadingShows = false
  
  copy_name:string = "";
  formatted_name
  copy_response;
  copying: boolean;

  // add: boolean = false;
  add: boolean = true;
  dl_response;
  validateForm: UntypedFormGroup;
  vid_info;

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
    private fb: UntypedFormBuilder) { }

  ngOnInit()
  {
    this.disabled = false;
    // this.add = false;
    this.copying = false;
    this.validateForm = this.fb.group({
      url: ["", [Validators.required]],
      name: ["test", [Validators.required]]
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
    if(event.key == "Escape")
    {
      this.box.nativeElement.blur();
    }
  }

  handleFileInput(files: FileList)
  {
    this.fileToUpload = files.item(0);
  }

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
        data: `${this.API_URL}/directory1/${this.path}/${file}`,

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
      const requestUrl =
        `${this.API_URL}/directory/format_name?filename=${filename}`;

      this.http.get(requestUrl, {
      })
        .subscribe(data => {
          this.formatted_name = data
          this.copy_name = this.formatted_name["prefix"]
        })
    }
    resetForm()
    {
      this.validateForm.reset();
      this.dl_response = "";
    }
    onCopy(filename)
    {
      console.log(filename)
      // this.copying = true;
      // const requestUrl =
      //   `${this.API_URL}/directory/copy_file/${this.path}?&destname=${this.copy_name}${this.formatted_name["suffix"]}&filename=${filename}`;

      // this.http.get(requestUrl, {
      // })
      //   .subscribe(data => {
      //     this.copy_response = data; //  This just says done
      //     this.copying = false;
      //   })
    }
    onMove(filename)
    {
      this.copying = true;
      const requestUrl =
        `${this.API_URL}/directory/move_file/${this.path}?&destname=${this.copy_name}${this.formatted_name["suffix"]}&filename=${filename}`;

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

    // downloadVideo()
    // {
    //   this.dl_response=""
    //   this.disabled = true;
    //   var url = this.validateForm.value.url
    //   var name = ""
    //   if (this.validateForm.value.name)
    //   {
    //     name = this.validateForm.value.name
    //   }

    //   const requestUrl =
    //     `${this.API_URL}/directory/youtube-dl/${this.path}?name=${name}&url=${url}`;

    //   this.http.get(requestUrl, {
    //   })
    //     .subscribe(data => {
    //       console.log(data)
    //       this.dl_response = data;
    //       this.disabled = false;
    //       this.getDirectory()
    //     })
    // }

    downloadVideo()
    {
        this.disabled = true;
        var url = this.validateForm.value.url
        var name = ""
        if (this.validateForm.value.name)
        {
            name = this.validateForm.value.name
        }
        const requestUrl =
            `${this.API_URL}/download/youtube-dl/${this.path}`;

            // ?name=${name}&url=${url}
        var body = {
                name: name,
                url: url
            }
            this.http.post(requestUrl, body).subscribe(
                (data: any) => {
                  // update the download progress as a percentage
                  this.progress = data.progress / data.total * 100;
                },
                (error: any) => {
                  console.error(error);
                }
              );
    }

    checkVideo()
    {
      var url = this.validateForm.value.url

      const requestUrl = `${this.API_URL}/directory/youtube-dl-info?url=${url}`;

      this.http.get(requestUrl, {
      })
        .subscribe(data => {
          // console.log(data)
          this.vid_info = data
        })
    }

  private getDirectory()
  {
    this.loadingShows = true
    const requestUrl =
      `${this.API_URL}/directory/folder/${this.path}?&column=${this.column}&sort=${this.sort}&query=${this.query}`;

      this.http.get<Directory>(requestUrl, {
      })
        .subscribe(posts => {
          this.shows = posts;
          this.loadingShows = false

          if (!this.shows.valid)
          {
            this.path = ""
            this.navCall()
          }
        })
  }
}
