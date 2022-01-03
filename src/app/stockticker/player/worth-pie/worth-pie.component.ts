import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-worth-pie',
  templateUrl: './worth-pie.component.html',
  styleUrls: ['./worth-pie.component.css']
})
export class WorthPieComponent implements OnInit, OnChanges
{
  @Input() worth

  // data;
  // options;

  results;
  view: any[] = [, 350];
  colorScheme = {
    domain: ["#8a3ffc", "#08bdba"]
  };
  animations = false
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() { }

  ngOnInit()
  {
    // this.options = {
    //   "title": "Net Worth",
    // }
  }

  ngOnChanges()
  {
    // this.data = []
    this.results = []

    for(let key in this.worth)
    {
      this.results.push({
        "name": key,
        "value": this.worth[key]
      })
    }

    // for(let key in this.worth)
    // {
    //   this.data.push({
    //     "group": key,
    //     "value": this.worth[key]
    //   })
    // }
  }
}
