import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // 
  files;
  url;

  //QueryParams
  params;
  search;
  sort;
  column;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.params = this.route.queryParams.subscribe(params => {
      this.search = params["search"] || "*"
      this.sort = params["sort"] || "desc"
      this.column = params["column"] || "modify_time"
      this.getFiles()
    })
  }

  onSearchChange(searchValue: string): void {  
    this.search = searchValue
    this.getFiles()
    this.navCall()
  }
  navCall() {
    this.router.navigate(['search'], { queryParams: { search: this.search, sort: this.sort, column: this.column } });
  }
  onView(file) {
    // file
    // this.url = ""
    var path = encodeURIComponent(file["path"]);
    this.url = "http://192.168.0.16:8000/shows/file?ui_path=" + path
  }

  private getFiles() {
    // console.log(this.path)
    this.http.get("http://192.168.0.16:8000/shows/search?search=" + this.search + "&column=" + this.column + "&sort=" + this.sort, {
    })
      .subscribe(posts => {
        this.files = posts;
        if (!this.files.valid) {
          // this.navCall()
        }
      })
  }
}
