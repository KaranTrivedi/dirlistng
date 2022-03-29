import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit
{

  rawData = ``

  csvData
  data
  layout

  constructor(private http: HttpClient)
  {
  }

  ngOnInit()
  {
    var trace1 = {
      x: [1000, 2000],
      y: ["test1", "test1"],
      z: [1500, 1500],
      mode: 'lines',
      marker: {
        color: '#bcbd22',
        size: 12,
        symbol: 'circle',
        line: {
          color: 'rgb(0,0,0)',
          width: 0
        }},
      line: {
        color: '#bcbd22',
        width: 1
      },
      type: 'scatter3d'
    };
    
    var trace2 = {
      x: [1000, 2000],
      y: ["test2", "test2"],
      z: [1501, 1501],
      mode: 'lines',
      marker: {
        color: '#bcbd22',
        size: 12,
        symbol: 'circle',
        line: {
          color: 'rgb(0,0,0)',
          width: 0
        }},
      line: {
        color: '#bcbd22',
        width: 1
      },
      type: 'scatter3d'
    };
    
    var trace3 = {
      x: [2500, 3500],
      y: ["test1", "test1"],
      z: [1502, 1502],
      mode: 'lines',
      marker: {
        color: '#bcbd22',
        size: 12,
        symbol: 'circle',
        line: {
          color: 'rgb(0,0,0)',
          width: 0
        }},
      line: {
        color: '#bcbd22',
        width: 1
      },
      type: 'scatter3d'
    };

    this.data = [trace1, trace2, trace3];
      this.layout = {
      }
      console.log(this.data)
    }

  getData = () =>
  {
    // this.csvData = d3.csv.parse(this.rawData)
    // console.log(this.csvData)
  };
}
