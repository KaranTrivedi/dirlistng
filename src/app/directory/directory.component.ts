import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shows } from './shows';
// import { FileService } from './files.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-downloads',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})

export class DirectoryComponent implements OnInit
{
  @ViewChild('videoPlayer') videoplayer: ElementRef;

  shows: any;
  // path_vars: string[] = [""];
  file: string// = [""]
  show_vid;

  fileToUpload: File = null;

  url;
  // QueryParams
  params;
  path;
  sort;
  column;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.params = this.route.queryParams.subscribe(params => 
    {
      this.path = params["path"] || ""
      this.sort = params["sort"] || "desc"
      this.column = params["column"] || "modify_time"
      this.getShows()
    })
  }
  handleFileInput(files: FileList)
  {
    this.fileToUpload = files.item(0);
  }

  // uploadFileToActivity() {
  //   this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
  //     // do something, if upload success
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  onClickShows(folder) {
    folder = encodeURIComponent(folder);
    this.path = this.path + folder + "/"
    this.navCall()
    // this.getShows()
  }

  onDownload(file) {
    this.file = file;
    file = encodeURIComponent(file);
    // file = file.replace("+","%2B");
    // file = file.replace(";","%3B");
    this.http.get("http://192.168.0.16:8000/path/" + this.path + file, {
      responseType: 'blob',
    }
    ).subscribe(response => this.downLoadFile(response, "application/octet-stream"));
  }

  onNav(i)
  {
    if(i == -1)
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
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
  private getShows() {
    // console.log(this.path)
    this.http.get<Shows>("http://192.168.0.16:8000/path/"+ this.path + "?&column=" + this.column + "&sort=" + this.sort, {
    })
      .subscribe(posts => {
        this.shows = posts;
        if (!this.shows.valid) {
          this.path = ""
          this.navCall()
        }
      })
  }

  onSearch(value) {
    console.log(value)
  }

  sortData(event)
  {
    this.column = event.active
    this.sort = event.direction
    this.navCall()
  }

  onView(file) 
  {
    this.file = file
    if (this.show_vid) {
      this.show_vid = false
    }
    if (!this.show_vid) {
      this.show_vid = true
    }

    file = encodeURIComponent(file);
    this.url = "http://192.168.0.16:8000/path/"+ this.path + file
  }

  toggleVid()
  {
    this.show_vid = false;
  }

  navCall()
  {
    this.router.navigate(['directory'], { queryParams: { path: this.path, sort: this.sort, column: this.column } });
  }

  downLoadFile(data: any, type: string)
  {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.download = this.file;
    anchor.href = url;
    anchor.click();

    // let pwa = window.open(url);
    // if (!pwa || pwa.closed || typeof pwa.closed == this.file) {
    //   alert('Please disable your Pop-up blocker and try again.');
    //   console.log("issues")
    // }
  }
}
