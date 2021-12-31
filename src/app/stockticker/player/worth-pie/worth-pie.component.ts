import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-worth-pie',
  templateUrl: './worth-pie.component.html',
  styleUrls: ['./worth-pie.component.css']
})
export class WorthPieComponent implements OnInit, OnChanges
{
  @Input() worth
  options;
  data = []
  constructor() { }

  ngOnInit()
  {
    this.options = {
      "title": "Net Worth",
    }
  }

  ngOnChanges()
  {
    this.data = []
    for(let key in this.worth)
    {
      this.data.push({
        "group": key,
        "value": this.worth[key]
      })
    }
  }
}
