import { Component, OnInit, PipeTransform, Pipe, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// import { DomSanitizer } from '@angular/platform-browser';

// @Pipe({ name: 'safe' })
// export class SafePipe implements PipeTransform {
//   constructor(private sanitizer: DomSanitizer) {}
//   transform(url) {
//     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
//   }
// }

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit
{
  panelOpenState = false;

  files;
  url;

  //QueryParams
  params;
  query;

  direction;
  column;

  length;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  from = 0

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit()
  {
    this.params = this.route.queryParams.subscribe(params => {
      this.direction = params["direction"] || "desc"
      this.column = params["column"] || "modify_time"
      this.query = params["query"] || "*"
      this.pageIndex = params["page"] || "0"
      this.pageSize = params["size"] || "10"
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
    this.panelOpenState = false;
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
    this.navCall()
  }

  onSearchChange(searchValue: string): void
  {
    this.pageIndex = 0
    this.query = searchValue
    this.navCall()
  }

  sortData(event)
  {
    this.pageIndex = 0
    this.column = event.active
    this.direction = event.direction
    this.navCall()
  }

  navCall()
  {
    // this.panelOpenState = false;
    this.router.navigate(['search'], { queryParams: { direction: this.direction, column: this.column, query: this.query, page: this.pageIndex, size: this.pageSize } });
  }

  onNav(file)
  {
    this.router.navigate(['directory'], { queryParams: { path: file.parent} });
  }

  onView(file)
  {
    this.url = ""
    var path = encodeURIComponent(file["path"]);
    this.url = "http://192.168.0.16:8000/path/" + path
  }
  
  private getFiles() {
    this.from = this.pageIndex * this.pageSize

    this.http.get("http://192.168.0.16:8000/search/?query=" + this.query + "&column=" + this.column + "&direction=" + this.direction + "&from_doc=" + this.from + "&size=" + this.pageSize,
      {
      })
      .subscribe(posts => {
        this.files = posts;
      })
  }
}
