import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StockService } from '../stockService';

@Component({
  selector: 'app-val-graph',
  templateUrl: './val-graph.component.html',
  styleUrls: ['./val-graph.component.css']
})
export class ValGraphComponent implements OnInit
{
  // @Input() data;
  @Input() title;
  options;
  data = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void
  {
    this.stockService.data$.subscribe(
        (data) => {
          if (data.length)
          {
            this.data = data
            console.log(data)
          }
          else
          {
            // console.log(this.data)
          }
        }
      )
  }

  ngOnChanges(changes: SimpleChanges)
  {
    this.options = {
      "title": this.title,
      "curve": "curveMonotoneX",
      "axes": {
        "bottom": {
          "title": "Stocks over time",
          "mapsTo": "key",
          "scaleType": "linear"
        },
        "left": {
          "mapsTo": "value",
          "title": "Value",
          "scaleType": "linear",
          "domain": [
            0,
            1.8
          ]
        }
      },
      "height": "300px"
    }
  }
}

function getRandom(max)
{
    // return (Math.random() * (0 - 2) + 2).toFixed(4)
    return Math.floor(Math.random() * max)
}