import { Component, OnInit, PipeTransform, Pipe, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/services/api.service';

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
  api_url;

  //QueryParams
  params;
  query;

  sort;
  column;

  length;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  from = 0

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit()
  {
    this.api_url = this.apiService.getApiUrl();
    this.params = this.route.queryParams.subscribe(params => {
      this.sort = params["sort"] || "desc"
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
    this.sort = event.direction
    this.navCall()
  }

  navCall()
  {
    // this.panelOpenState = false;
    this.router.navigate(['search'], { queryParams: { sort: this.sort, column: this.column, query: this.query, page: this.pageIndex, size: this.pageSize } });
  }

  onNav(file)
  {
    this.router.navigate(['directory'], { queryParams: { path: file.parent} });
  }

  onDownload(file)
  {
    this.apiService.Download(file.name, file.parent)
  }

  onView(file)
  {
    // this.url = ""
    // var path = encodeURIComponent(file["path"]);
    // this.url = "http://192.168.0.16:8000/path/" + path
  }

  private getFiles() {
    this.from = this.pageIndex * this.pageSize
    const requestUrl =
    `${this.api_url}search/?column=${this.column}&sort=${this.sort}&query=${this.query}&from_doc=${this.from}&size=${this.pageSize}`

    this.http.get(requestUrl,
      {
      })
      .subscribe(posts => {
        this.files = posts;
      })
  }
}
