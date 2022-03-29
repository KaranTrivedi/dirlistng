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
  @Input() domain
  @Input() holdings

  // data;
  // options;

  results;
  view: any[] = [, 350];
  animations = false

  showLegend = true;
  colorScheme = {
    domain: []
  };
  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() { }

  ngOnInit()
  {
    // this.options = {
    //   "title": "Holdings",
    //   "color": {
    //     "scale": this.scale
    //   }
    // }
  }
  
  ngOnChanges()
  {
    // this.data = []
    this.results = []
    this.colorScheme.domain = []

    for(let key in this.holdings)
    {
      this.colorScheme.domain.push(this.scale[key])
      this.results.push({
        "name": key,
        "value": this.holdings[key]
      })
    }
    // for(let key in this.holdings)
    // {
    //   this.colorScheme.domain.push(this.scale[key])
    //   this.data.push({
    //     "group": key,
    //     "value": this.holdings[key]
    //   })
    // }
  }
}