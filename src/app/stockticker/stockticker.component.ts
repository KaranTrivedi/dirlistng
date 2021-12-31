import { ConditionalExpr } from '@angular/compiler';
import { ConsoleLogger } from '@angular/compiler-cli/private/localize';
import { Component, HostListener, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { StockService } from './stockService'

@Component({
    selector: 'app-stockticker',
    templateUrl: './stockticker.component.html',
    styleUrls: ['./stockticker.component.css']
})

export class StocktickerComponent implements OnInit
{
    subscription: Subscription
    turn_num = 1
    domain= [0, 50]

    amount;
    roll_type;

    AMOUNTS = [0.05, 0.1, 0.2]
    ROLL_TYPE = ["up", "down", "div"]

    logs = []

    stocks = [
        {
            "name" : "grain",
            "values" : [1],
            "color": "#018577"
        },
        {
            "name" : "industrial",
            "values" : [1],
            "color": "#0000FF"
        },
        {
            "name" : "gold",
            "values" : [1],
            "color": "#FFD700"
        },
        {
            "name" : "silver",
            "values" : [1],
            "color": "#C0C0C0"
        },
        {
            "name" : "oil",
            "values" : [1],
            "color": "#616161"
        },
        {
            "name" : "bonds",
            "values" : [1],
            "color": "#005416"
        }
    ]

    data = []
    scale = {};
    options;

    constructor(private stockService: StockService,
        private message: NzMessageService)
    {
    }

    @HostListener('document:keydown', ['$event'])
    handleKBEvent(event: KeyboardEvent)
    {
        console.log(event.key)
        if(event.key == "ArrowRight")
        {
            this.onTurn(10)
        }
        if(event.key == "Delete")
        {
            this.onTurn(-1)
        }
    }

    ngOnInit(): void
    {
        this.data = []
        for (var i = 0; i < this.stocks.length; i++)
        {
            this.stocks[i]["values"] = [1]                
            this.data.push({
                "group": this.stocks[i]["name"],
                "key": 0,
                "value": 1
            },)

            this.scale[this.stocks[i]["name"]] = this.stocks[i]["color"]
        }

        // const source = interval(1000)
        // this.subscription = source.subscribe(val =>
        //     {
        //         this.onTurn(10)
        //     }
        // )

        // this.stockService.data$.subscribe((data) => 
        // {
        //     if (data.length)
        //     {
        //         this.data = data
        //         console.log(data)
        //     }
        //     else
        //     {
        //     }
        // }
        // )

        this.options = {
            "title": "Stockmarket",
            // "curve": "curveMonotoneX",
            "axes":
            {
                "bottom":
                {
                    "title": "Stocks over time",
                    "mapsTo": "key",
                    "scaleType": "linear",
                    "domain": this.domain
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
            // "height": "350px"
        }
        this.onTurn(-1)
    }
    createMessage(type: string, name: string): void
    {
        if(type == "dividend")
        {
            this.message.create('warning', `${name} pays out dividend!`);
        }
        if(type == "split")
        {
            this.message.create('success', `${name} has split!`);
        }
        if(type == "bust")
        {
            this.message.create('error', `${name} is bust!`);
        }
    }
    onTurn(num)
    {
        if (num == -1)
        {
            // reset
            this.data = []
            this.turn_num = 1
            for (var i = 0; i < this.stocks.length; i++)
            {
                this.stocks[i]["values"] = [1]                
                this.data.push({
                    "group": this.stocks[i]["name"],
                    "key": 0,
                    "value": 1
                },)
            }
            this.domain = [0, 50]
            this.logs = []
            this.options.axes.bottom.domain = this.domain
            this.options = Object.assign({}, this.options)
            this.stocks = [
                {
                    "name" : "grain",
                    "values" : [1],
                    "color": "#018577"
                },
                {
                    "name" : "industrial",
                    "values" : [1],
                    "color": "#0000FF"
                },
                {
                    "name" : "gold",
                    "values" : [1],
                    "color": "#FFD700"
                },
                {
                    "name" : "silver",
                    "values" : [1],
                    "color": "#C0C0C0"
                },
                {
                    "name" : "oil",
                    "values" : [1],
                    "color": "#616161"
                },
                {
                    "name" : "bonds",
                    "values" : [1],
                    "color": "#005416"
                }
            ]
        }
        else
        {
            for (var i = this.turn_num; i < this.turn_num+num; i++)
            {
                var value
                var stock_index = getRandom(this.stocks.length)

                this.roll_type = this.ROLL_TYPE[getRandom(this.ROLL_TYPE.length)]
                this.amount = this.AMOUNTS[getRandom(this.AMOUNTS.length)]

                if (this.roll_type == "up")
                {
                    value = Math.round(( (this.stocks[stock_index]["values"][i-1] + this.amount) + Number.EPSILON) * 100) / 100
                }
                if (this.roll_type == "down")
                {
                    value = Math.round(( (this.stocks[stock_index]["values"][i-1] - this.amount) + Number.EPSILON) * 100) / 100
                }
                
                if(this.roll_type == "div")
                {
                    value = this.stocks[stock_index]["values"][i-1]
                    // this.createMessage('dividend', this.stocks[stock_index]["name"])
                }
                
                if (value <= 0)
                {
                    value = 1
                    this.createMessage('bust', this.stocks[stock_index]["name"])
                    this.logs.unshift({
                        "type": 1,
                        "name": this.stocks[stock_index]["name"],
                        "action": "bust"
                    })
                }
                if (value >= 2)
                {
                    value = 1
                    this.createMessage('split', this.stocks[stock_index]["name"])
                    this.logs.unshift({
                        "type": 1,
                        "name": this.stocks[stock_index]["name"],
                        "action": "split"
                    })
                }

                this.stocks[stock_index]["values"].push(value)

                this.logs.unshift(
                {
                    "type": 0,
                    "turn_num": i,
                    "name": this.stocks[stock_index]["name"],
                    "action": this.roll_type,
                    "amount": this.amount,
                    "value": this.stocks[stock_index]["values"][i],
                })
                this.logs = this.logs.splice(0, 50);

                for (var j = 0; j < this.stocks.length; j++)
                {
                    if (j != stock_index)
                    {
                        this.stocks[j]["values"].push(this.stocks[j]["values"][i-1])
                    }

                    try
                    {
                        this.stocks[j]["delta"] = Math.round((this.stocks[j]["values"][i-num] - this.stocks[j]["values"][i])*100)/100
                    }
                    catch (error)
                    {
                        this.stocks[j]["delta"] = 0
                    }
                    if(this.stocks[j]["delta"] < 0)
                    {
                        this.stocks[j]["change"] = "up"
                    }
                    else if(this.stocks[j]["delta"] > 0)
                    {
                        this.stocks[j]["change"] = "down"
                    }
                    else
                    {
                        this.stocks[j]["change"] = "nil"
                    }
    
                    this.stocks[j]["delta"] = Math.abs(this.stocks[j]["delta"])
    
                    this.data.push({
                        "group": this.stocks[j]["name"],
                        "key": i,
                        "value": this.stocks[j]["values"][i]
                    },)
                }
            }

            this.turn_num += num;
            this.data = this.data.slice(Math.max(this.data.length - 300, 0))

            if(this.turn_num > 50)
            {
                this.domain = [this.turn_num-50, this.turn_num]

                this.options.axes.bottom.domain = this.domain
                this.options = Object.assign({}, this.options)
            }

            this.data = [...this.data];
        }
    }
}

function getRandom(max)
{
    // return (Math.random() * (0 - 2) + 2).toFixed(4)
    return Math.floor(Math.random() * max)
}

export interface Person {
    key: string;
    name: string;
    age: number;
    address: string;
  }
  