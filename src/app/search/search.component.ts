import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ApiService } from 'src/services/api.service';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
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

  vlc_url

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
  setPageSizeOptions(setPageSizeOptionsInput: string)
  {
    if (setPageSizeOptionsInput)
    {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

@HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    // console.log(event.key)
    if(event.key == "Ctrl.f")
    {
      this.box.nativeElement.focus();
    }
    if(event.key == "PageDown")
    {
      this.pageIndex = Number(this.pageIndex) + 1
      this.navCall()
    }
    if(event.key == "PageUp" && Number(this.pageIndex) > 0)
    {
      this.pageIndex = Number(this.pageIndex) - 1
      this.navCall()
    }
    if(event.key == "Home")
    {
      this.pageIndex = 0
      this.navCall()
    }
    if(event.key == "Escape")
    {
      this.box.nativeElement.blur();
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
    this.router.navigate([`directory/${file.parent}`]);
  }

  onDownload(file)
  {
    this.apiService.Download(file.parent, file.name)
  }

  onVLC(file)
  {
    this.vlc_url = `${this.API_URL}/directory1/${file.path}`
  }

  onView(file)
  {
    //   const dialogConfig1 = new MatDialogConfig();
      this.dialog.open(VideoPopupComponent,
        {
        data: `${this.API_URL}/directory1/${file.path}`,
        height: '66%',
        width: '75%'
      });
  }

  onRefresh()
  {
    const requestUrl = `${this.API_URL}/search/refresh`

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
    `${this.API_URL}/search/?column=${this.column}&sort=${this.sort}&query=${this.query}&from_doc=${this.from}&size=${this.pageSize}`

    this.http.get(requestUrl,
      {
      })
      .subscribe(posts => {
        this.files = posts;
      })
  }
}
