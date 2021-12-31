import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnChanges
{
  @Input() players
  @Input() scale

  index
  holdings
  worth
  player

  constructor() {}

  @HostListener('document:keydown', ['$event'])
  handleKBEvent(event: KeyboardEvent)
  {
      // console.log(event.key)
      if(event.key == "PageDown")
      {
        if(this.index < this.players.length-1)
        {
          this.index +=1
        }
        else
        {
          this.index = 0
        }
        this.selectPlayer(this.index)
      }
      if(event.key == "PageUp")
      {
        if(this.index > 0)
        {
          this.index -=1
        }
        else
        {
          this.index = this.players.length-1
        }
        this.selectPlayer(this.index)
      }
  }

  ngOnInit()
  {
    this.selectPlayer(0)
    this.index = 0
  }
  ngOnChanges(change)
  {
    if(this.player)
    {
      this.holdings = Object.assign({}, this.player.holdings)
      this.worth = Object.assign({}, {
       "Cash" : this.player.coh,
       "Market Value" : this.player.market_val
      })
    }
  }

  selectPlayer(i)
  {
    this.index = i
    this.player = this.players[i]
    this.holdings = Object.assign({}, this.player.holdings)
    this.worth = Object.assign({}, {
      "Cash" : this.player.coh,
      "Market Value" : this.player.market_val
     })
  }

  playerLogStyle(type, action)
  {
      if(type == 2 || (type == 1 && action == "doubled!"))
      {
          var styles = {
              'background-color' : "rgba(0, 255, 0, 0.2)"
          }
      }
      if (action == "lost!")
      {
          var styles = {
              'background-color' : "rgba(255, 0, 0, 0.4)"
          }
      }
      return styles 
  }

}
