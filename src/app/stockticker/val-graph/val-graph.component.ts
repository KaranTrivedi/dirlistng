import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StockService } from '../stockService';

@Component({
	selector: 'app-val-graph',
	templateUrl: './val-graph.component.html',
	styleUrls: ['./val-graph.component.css']
})
export class ValGraphComponent implements OnInit
{
	@Input() scale;
	options;
	data;
	domain;

	constructor(private stockService: StockService) { }

	ngOnInit(): void
	{
	  this.options = {
		"title": "Stockmarket",
		"legend":
		{
			"enabled": false
		},
		"axes":
		{
			"bottom":
			{
				"mapsTo": "key",
				"scaleType": "linear",
				"domain": [0, 50]
			},
			"left":
			{
				"mapsTo": "value",
				"title": "Value",
				"scaleType": "linear",
				"domain":[0, 2]
			}
		},
		"color": {
			"scale": this.scale
		},
	}

	this.stockService.stockLineData$.subscribe(
        (newData) => {
			this.data = newData.data
			this.domain = newData.domain

			this.options.axes.bottom.domain = this.domain
			this.options = Object.assign({}, this.options)
      }
    )
  }

  ngOnChanges(changes: SimpleChanges)
  {
    // console.log(changes)
  }
}
