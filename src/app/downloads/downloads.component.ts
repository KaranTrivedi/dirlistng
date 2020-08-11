import { Component, OnInit, ɵConsole, Sanitizer } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Shows } from './shows';
// import { FileService } from './files.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})

export class DownloadsComponent implements OnInit {
  shows: any;
  // path_vars: string[] = [""];
  file: string// = [""]

  url;
  //  = "http://192.168.0.16:8000/shows/file?path=Downloads/The.Leftovers.S01E03.720p.HDTV.x264-KILLERS/Sample/sample-the.leftovers.s01e03.720p.hdtv.x264-killers.mkv";

  // QueryParams
  params;
  path;
  sort;
  column;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.params = this.route.queryParams.subscribe(params => {
      this.path = params["path"] || "data"
      this.sort = params["sort"] || "desc"
      this.column = params["column"] || "creation"
      this.getShows()
    })
  }

  onClickShows(folder) {
    folder = encodeURIComponent(folder);
    this.path = this.path + folder + "/"
    this.navCall()
    this.getShows()
  }

  onNav(i) {
    var path = ""
    for (var x = 0; x <= i; x++) {
      path = path + encodeURIComponent(this.shows.path_vars[x]) + "/"
    }

    this.path = path
    this.navCall()
  }

  private getShows() {
    // console.log(this.path)
    this.http.get<Shows>("http://192.168.0.16:8000/shows/folders?ui_path=" + this.path + "&column=" + this.column + "&sort=" + this.sort, {
    })
      .subscribe(posts => {
        this.shows = posts;
        if (!this.shows.valid) {
          this.path = "data"
          this.navCall()
        }
      })
  }

  onSearch(value)
  {
    console.log(value)
  }

  onClickFiles(file) {
    this.file = file;
    file = encodeURIComponent(file);
    // file = file.replace("+","%2B");
    // file = file.replace(";","%3B");
    this.http.get("http://192.168.0.16:8000/shows/file?ui_path=" + this.path + "/" + file, {
      responseType: 'blob',
    }
    ).subscribe(response => this.downLoadFile(response, "application/octet-stream"));
  }

  onSort(val) {
    this.column = val
    if (this.sort == "asc") {
      this.sort = "desc"
    }
    else {
      this.sort = "asc"
    }
    this.navCall()
  }

  onView(file) {
    this.file = file
    this.url = ""
    file = encodeURIComponent(file);
    this.url = "http://192.168.0.16:8000/shows/file?ui_path=" + this.path + "/" + file
  }

  toggleVid() {
    this.url = ""
  }

  navCall() {
    this.router.navigate(['shows'], { queryParams: { path: this.path, sort: this.sort, column: this.column } });
  }

  // onHome() {
  //   this.path = "data"
  //   this.navCall()
  // }
  downLoadFile(data: any, type: string) {
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