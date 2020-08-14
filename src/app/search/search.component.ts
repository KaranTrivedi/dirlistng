import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

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

  length;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // pageEvent: PageEvent;
  from = 0

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.params = this.route.queryParams.subscribe(params => {
      this.sort = params["sort"] || "desc"
      this.column = params["column"] || "modify_time"
      this.search = params["search"] || "*"
      this.getFiles()
    })
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput)
    {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  paginate(event?:PageEvent)
  {
    console.log(event)
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
    this.navCall()
    this.getFiles()
  }
  onSearchChange(searchValue: string): void {
    this.pageIndex = 0
    this.search = searchValue
    this.navCall()
    this.getFiles()
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
  navCall() {
    this.router.navigate(['search'], { queryParams: { sort: this.sort, column: this.column, search: this.search } });
  }
  onView(file) {
    // file
    // this.url = ""
    var path = encodeURIComponent(file["path"]);
    this.url = "http://192.168.0.16:8000/shows/file?ui_path=" + path
  }
  
  private getFiles() {
    this.from = this.pageIndex * this.pageSize
    // console.log(this.path)
    this.http.get("http://192.168.0.16:8000/shows/search?search=" + this.search + "&column=" + this.column + "&sort=" + this.sort + "&from_doc=" + this.from + "&size=" + this.pageSize,
    {
    })
      .subscribe(posts => {
        this.files = posts;
      })
  }
}
