import { Component, Input, OnChanges, OnInit } from '@angular/core';

import "@carbon/charts/styles-g100.css";

@Component({
  selector: 'app-holdings-pie',
  templateUrl: './holdings-pie.component.html',
  styleUrls: ['./holdings-pie.component.css']
})
export class HoldingsPieComponent implements OnInit, OnChanges
{
  @Input() scale;
  @Input() holdings

  data;
  options;
  constructor() { }

  ngOnInit()
  {
    this.options = {
      "title": "Holdings",
      "color": {
        "scale": this.scale
      }
    }
  }

  ngOnChanges()
  {
    this.data = []

    for(let key in this.holdings)
    {
      this.data.push({
        "group": key,
        "value": this.holdings[key]
      })
    }
  }
}