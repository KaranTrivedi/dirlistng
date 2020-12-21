import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{
  constructor() { }
  ngOnInit(): void 
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
}