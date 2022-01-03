import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { StockService } from '../stockService';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnChanges
{
  @Input() players
  @Input() scale
  @Input() stocks
  @Input() domain

  @Output() processOrderEvent = new EventEmitter<string>();
  @Output() playerChangeEvent = new EventEmitter<string>();

  index
  holdings
  worth
  player
  standings;
  slider;

  to_buy;
  to_sell;

  actions = ["buy", "sell"]
  action;

  sell_amount = {}
  buy_amount = {}
  potential_gains = 0
  cash_required = 0
  order
  order_valid = true

  constructor(private stockService: StockService) {}

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

	  if(event.key == "Enter")
	  {
		  this.process()
	  }
      if(event.key == "Backspace")
	  {
		  this.resetOrder()
	  }
	  
    }

    ngOnInit()
    {
		this.selectPlayer(0)
      	this.index = 0
    }
	ngOnChanges(changes)
	{
		// console.log(changes)
		if(this.player)
		{
			this.setVal()
		}
	}
	selectPlayer(i)
	{
		this.index = i
		this.player = this.players[i]
		this.playerChangeEvent.emit(this.index);
		this.setVal()
	}

	process()
	{
		this.order = [this.buy_amount, this.sell_amount, this.index]
		this.processOrderEvent.emit(this.order);
	}
	resetOrder()
	{
		this.sell_amount = {}
		this.potential_gains = 0

		this.buy_amount = {}
		this.cash_required = 0
		this.order_valid = true
	}

	setSellSlider()
	{
		this.potential_gains = 0
		for (const [key, val] of Object.entries(this.sell_amount))
		{
			var index = this.stockService.getStockIndex(key)
			this.potential_gains += this.stocks[index]["values"][this.stocks[index].values.length-1]*Number(val)
		}
	}
	setBuySlider()
	{
		
		this.cash_required = 0
		for (const [key, val] of Object.entries(this.buy_amount))
		{
			var index = this.stockService.getStockIndex(key)
			this.cash_required += this.stocks[index]["values"][this.stocks[index].values.length-1]*Number(val)
		}

		if(this.cash_required > this.player.coh)
		{
			this.order_valid = false
		}
		else
		{
			this.order_valid = true
		}
	}
	checkBuy()
	{
		return !this.to_buy.every(item => item === 0)
	}
	trackByIndex(index: number, obj: any): any
	{
		return index;
	}

	setBoxStyle(name)
    {
        return this.stockService.setBoxStyle(name)
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
	cashHeaderStyle()
	{
		var styles = {}
		if(this.cash_required > this.player.coh)
		{
			styles = {
				'color' : "red"
			}
		}
		return styles
	}

	isEmpty(obj)
	{
		return Object.keys(obj).length === 0;
	}

	setVal()
	{
		this.sell_amount = {}
		this.potential_gains = 0

		this.buy_amount = {}
		this.cash_required = 0
		this.order_valid = true

		this.player = this.players[this.index]
		this.holdings = Object.assign({}, this.player.holdings)
		this.worth = Object.assign({}, {
			"Cash" : this.player.coh,
			"Market Value" : this.player.market_val
		})
		this.to_buy = []
		this.to_sell = {}
		for (var i=0; i< this.stocks.length;i++)
		{
			var amt = this.player["coh"]/this.stocks[i]["values"][this.stocks[i]["values"].length-1]
			this.to_buy.push(((amt - (amt % 500)) / 500)*500)
			this.to_sell[this.stocks[i]["name"]] = [(this.stocks[i]["values"][this.stocks[i]["values"].length-1]*this.player.holdings[this.stocks[i]["name"]]), this.stocks[i]["values"][this.stocks[i]["values"].length-1]]
		}
	}
}
