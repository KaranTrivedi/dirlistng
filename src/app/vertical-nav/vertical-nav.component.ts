import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.css']
})
export class HeaderComponent implements OnInit
{
  constructor(private apiService: ApiService) { }
  ngOnInit()
  {

  }

  selectedItem = '';

  listItems =
  [
    { linkTitle: 'Directory', link: 'directory' },
    { linkTitle: 'Search', link: 'search' },
    { linkTitle: 'Images', link: 'images' }
  ];

  handleClick(selectedItem)
  {
    this.selectedItem = selectedItem.linkTitle;
  }

  onToggle()
  {
    this.apiService.navToggle()
  }
}