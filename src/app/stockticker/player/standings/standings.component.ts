import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, OnChanges
{

  @Input() players;
  options;
  data;

  constructor() {}

  ngOnInit()
  {
    this.options = {
      "title": "Standings",
      "axes": {
        "left": {
          "scaleType": "labels",
          "mapsTo": "key"
        },
        "bottom": {
          "stacked": true,
          "mapsTo": "value"
        }
      }
    }
  }

  ngOnChanges()
  {
    this.data = []
    for(var i = 0; i < this.players.length; i++)
    {
      this.data.push(
        {
          "group": "coh",
          "value": this.players[i]["coh"],
          "key": this.players[i]["name"]
        }
      )
      this.data.push(
        {
          "group": "Market Value",
          "value": this.players[i]["market_val"],
          "key": this.players[i]["name"]
        }
      )
    }
  }

}
