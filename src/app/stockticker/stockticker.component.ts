import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stockticker',
  templateUrl: './stockticker.component.html',
  styleUrls: ['./stockticker.component.css']
})
export class StocktickerComponent implements OnInit
{

  options;

  STOCKS = [
    {
        "name": "grain",
        "color": "m",
        "values": [1]
    },
    {
        "name": "industrial",
        "color": "b",
        "values": [1]
    },
    {
        "name": "bonds",
        "color": "g",
        "values": [1]
    },
    {
        "name": "oil",
        "color": "k",
        "values": [1]
    },
    {
        "name": "silver",
        "color": "c",
        "values": [1]
    },
    {
        "name": "gold",
        "color": "y",
        "values": [1]
    }]

    onTurn()
    {
      
    }

  constructor() {}

  ngOnInit()
  {

    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

}
