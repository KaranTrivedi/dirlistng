import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VideoPopupComponent } from '../video-popup/video-popup.component';
import { environment } from 'src/environments/environment'

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
  @ViewChild("box") box;
  panelOpenState = false;

  files;
  file;

  today = new Date(new Date().setHours(0,0,0,0)).getTime();

  private API_URL= environment.API_URL;

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
    private apiService: ApiService,
    private dialog: MatDialog) { }

  ngOnInit()
  {
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

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    if(event.key == "/")
    {      
      this.box.nativeElement.focus();
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
    this.router.navigate(['search'], { queryParams: { sort: this.sort, column: this.column, query: this.query, page: this.pageIndex, size: this.pageSize } });
  }

  onToggle()
  {
    this.apiService.navToggle();
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
    //   const dialogConfig1 = new MatDialogConfig();

      this.dialog.open(VideoPopupComponent, {
        data: file.url,
        height: '66%',
        width: '80%'
      });

  }

  onRefresh()
  {
    const requestUrl = `${this.API_URL}search/refresh`

    this.http.get(requestUrl,
      {
      })
      .subscribe(posts => {
        this.files = posts;
      })
  }

  private getFiles() {
    this.from = this.pageIndex * this.pageSize
    const requestUrl =
    `${this.API_URL}search/?column=${this.column}&sort=${this.sort}&query=${this.query}&from_doc=${this.from}&size=${this.pageSize}`

    this.http.get(requestUrl,
      {
      })
      .subscribe(posts => {
        this.files = posts;
      })
  }
}
