import { Component, HostListener, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { interval, Subscription } from 'rxjs';
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
    MAX_DP = 100

    paused = true

    domain= [0, this.MAX_DP]

    amount;
    roll_type;
    
    AMOUNTS = [0.05, 0.1, 0.2]
    ROLL_TYPE = ["up", "down", "div"]

    logs = []

    data = []
    scale = {};

    stocks = []
    source

    players = [
        {
            "name": "AI_1",
            "coh": 5000,
            "market_val": 0,
            "net_worth": 5000,
            "holdings": {
            },
            "logs": []
        },
        {
            "name": "AI_2",
            "coh": 5000,
            "market_val": 0,
            "net_worth": 5000,
            "holdings": {
            },
            "logs": []
        },
        {
            "name": "AI_3",
            "coh": 5000,
            "market_val": 0,
            "net_worth": 5000,
            "holdings": {
            },
            "logs": []
        },
    ]

    AI_Players = [
        "AI_Nancy Johnson", "AI_Sherrie Ye", "AI_Jesse Craig", "AI_Brandon Velasco", "AI_Jimmy Kerr", "AI_Marie Warnick", "AI_Michael Connors", "AI_Michel Lozier", "AI_Meghan Temple", "AI_Richard Miltner", "AI_Evelyn Maxey", "AI_Dottie Grisham", "AI_Pedro Espinoza", "AI_Richard Harger", "AI_John Pressley", "AI_Shirley Orozco", "AI_John Tompkins", "AI_Glenn Terry", "AI_Angie Reidy", "AI_Marie Maxwell", "AI_James Martin", "AI_Jackie Schultz", "AI_Michael Miller", "AI_Nicole Marcial", "AI_Lisa Sirois", "AI_Edna Laperouse", "AI_Matthew Raney", "AI_Jennifer Grear", "AI_Phil Smith", "AI_Beulah Sanders", "AI_Kelly Buchwald", "AI_Kristi Estler", "AI_Jane Vandusen", "AI_William Tharp", "AI_William West", "AI_Kenneth Black", "AI_Jonathan Asher", "AI_Pamela Lock", "AI_Jeremy Quinn", "AI_Aaron York", "AI_Allen Barkley", "AI_John Francis", "AI_Shawn Kruse", "AI_Kerri Frenzel", "AI_Frank Black", "AI_Sandra Gannon", "AI_Jason Brown", "AI_Eric Sembler", "AI_Janice Knight", "AI_Bryan Newcomb", "AI_Justin Robb", "AI_Mattie Mcclurg", "AI_Michael Stephens", "AI_Terry Maddux", "AI_Joy Machenry", "AI_Terry Sydnor", "AI_Stuart Morrison", "AI_Patricia Bishop", "AI_Patsy Green", "AI_Alvin Burgin", "AI_Mary Yost", "AI_Patricia Primavera", "AI_Michael Logan", "AI_Robert Johnson", "AI_Thelma Argabright", "AI_Bob Mcrae", "AI_James Regalado", "AI_Sheri Peterson", "AI_John Taylor", "AI_James Colin", "AI_Kenneth Leary", "AI_Tamara Ziegler", "AI_Wesley Washington", "AI_Michael Hunt", "AI_Gabriela Taylor", "AI_Sherry Adams", "AI_Mary Breaux", "AI_Sue Harrison", "AI_Antonio Beal", "AI_Ann Barnett", "AI_Margaret Gary", "AI_Jeanette Brown", "AI_Vilma Jones", "AI_Gordon Smith", "AI_Velma Coulter", "AI_Samantha Black", "AI_Barbara Mosher", "AI_Johnny Wallace", "AI_Kenneth Wilson", "AI_Ada Russell", "AI_Steve Sweet", "AI_Kimberly Rogers", "AI_Ruby Lawrence", "AI_Mary Eber", "AI_Lisa Rich", "AI_Catherine Daye", "AI_Ronald Mclemore", "AI_Dudley Cox", "AI_Sharon Grissom", "AI_Beulah Joyner", "AI_Justin Lehnertz", "AI_Ofelia Lohman", "AI_Anthony Frey", "AI_Cyril Talmadge", "AI_Kyle Kim", "AI_Edward Eckstein", "AI_Tammy Scott", "AI_Tammy Larson", "AI_Kenneth Demery", "AI_Sarah Saeler", "AI_Jeremy Suiter", "AI_Chad Simonson", "AI_Helen Luciani", "AI_Andrew Hwang", "AI_Luella Dubreuil", "AI_Randy Lloyd", "AI_Melvin Boldt", "AI_Richard Dunbar", "AI_Matthew Apo", "AI_Brandon Vasquez", "AI_Donna Bourgeois", "AI_Margaret Threatt", "AI_Russell Zahar", "AI_Philip Warner", "AI_Robert Carron", "AI_Marie Sink", "AI_Andrew Gillenwaters", "AI_Barbara Wages", "AI_Alice Ortiz", "AI_Jeffrey Seveney", "AI_Carol Swedlund", "AI_John Illiano", "AI_Richard Wolf", "AI_Sheryl Choate", "AI_Danny Beamer"
    ]

    stocks_ref = [
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

    constructor(private stockService: StockService,
        private message: NzMessageService)
    {
    }

    @HostListener('document:keydown', ['$event'])
    handleKBEvent(event: KeyboardEvent)
    {
        // console.log(event.key)
        if(event.key == "ArrowRight")
        {
            this.onTurn(10)
        }
        if(event.key == " ")
        {
            this.onTurn(1)
        }
        if(event.key == "Delete")
        {
            this.onTurn(-1)
        }
    }

    ngOnInit(): void
    {
        this.data = []
        this.stocks = this.stocks_ref
        for (var i = 0; i < this.stocks.length; i++)
        {
            this.data.push({
                "group": this.stocks[i]["name"],
                "key": 0,
                "value": this.stocks[i]["values"][0]
            },)
            this.scale[this.stocks[i]["name"]] = this.stocks[i]["color"]
        }

        this.source = interval(1000)
        // this.subscription = this.source.subscribe(val =>
        //     {
        //         this.onTurn(10)
        //         this.paused = false
        //     }
        // ) 
        
        this.stockService.setstockLineData({"domain": this.domain, "data": this.data})
    }

    playpause()
    {
        if(this.paused == false)
        {
            console.log(this.paused)
            this.subscription.unsubscribe()
            this.paused = true
        }
        else
        {
            this.subscription = this.source.subscribe(val =>
                {
                    this.onTurn(10)
                }
            )
            this.paused = false
        }
    }

    onInput(event)
    {
       var val = parseInt((event.target as HTMLInputElement).value)
    }

    setBoxStyle(color)
    {
        var styles = {
            'background-color' : color,
            'height': '15px',
            'width': '15px',
            'border': '1px solid black',
            'display': 'inline-block',
            'vertical-align': 'sub',
        }
        return styles
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
            this.stocks = this.stocks_ref
        }
        else
        {
            for (var i = this.turn_num; i < this.turn_num+num; i++)
            {
                var outcome
                var value
                var stock_index = this.stockService.getDiscreteRandom(this.stocks.length)

                this.roll_type = this.ROLL_TYPE[this.stockService.getDiscreteRandom(this.ROLL_TYPE.length)]

                this.amount = this.AMOUNTS[this.stockService.getDiscreteRandom(this.AMOUNTS.length)]

                if (this.roll_type == "up")
                {
                    value = Math.round( ((this.stocks[stock_index]["values"][i-1] + this.amount) + Number.EPSILON) * 100) / 100
                }
                if (this.roll_type == "down")
                {
                    value = Math.round( ((this.stocks[stock_index]["values"][i-1] - this.amount) + Number.EPSILON) * 100) / 100
                }

                if(this.roll_type == "div")
                {
                    value = this.stocks[stock_index]["values"][i-1]
                }

                if (value <= 0)
                {
                    value = 1
                    outcome = "bust"
                    this.createMessage('bust', this.stocks[stock_index]["name"])
                    this.logs.unshift({
                        "type": 1,
                        "name": this.stocks[stock_index]["name"],
                        "action": "bust"
                    })
                    this.logs = this.logs.splice(0, 50);
                }
                else if (value >= 2)
                {
                    value = 1
                    outcome = "split"
                    this.createMessage('split', this.stocks[stock_index]["name"])
                    this.logs.unshift({
                        "type": 1,
                        "name": this.stocks[stock_index]["name"],
                        "action": "split"
                    })
                    this.logs = this.logs.splice(0, 50);
                }
                else
                {
                    outcome = null
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

                // For each loop, update player assets. Or store log and update outside 
                for(var f = 0; f<this.players.length;  f++)
                {
                    if(this.roll_type == "div" && this.stocks[stock_index]["values"][i] >= 1 && this.players[f]["holdings"].hasOwnProperty(this.stocks[stock_index]["name"]))
                    {
                        this.players[f]["coh"] += this.amount*this.players[f]["holdings"][this.stocks[stock_index]["name"]]
                        this.players[f].logs.unshift(
                            {
                                "type": 2,
                                "turn_num": i,
                                "name": this.stocks[stock_index]["name"],
                                "action": "dividend",
                                "worth": this.amount*this.players[f]["holdings"][this.stocks[stock_index]["name"]],
                                "at": this.amount,
                            }                            
                        )
                        this.players[f].logs = this.players[f].logs.splice(0, 50);
                    }

                    if(outcome == "split" && this.players[f]["holdings"].hasOwnProperty(this.stocks[stock_index]["name"]))
                    {
                        this.players[f]["holdings"][this.stocks[stock_index]["name"]]*=2
                        this.players[f].logs.unshift(
                            {
                                "type": 1,
                                "turn_num": i,
                                "count": this.players[f]["holdings"][this.stocks[stock_index]["name"]],
                                "name": this.stocks[stock_index]["name"],
                                "action": "doubled!",
                            }
                        )
                        this.players[f].logs = this.players[f].logs.splice(0, 50);
                    }
                    if(outcome == "bust" && this.players[f]["holdings"].hasOwnProperty(this.stocks[stock_index]["name"]))
                    {
                        this.players[f].logs.unshift(
                            {
                                "type": 1,
                                "turn_num": i,
                                "count": this.players[f]["holdings"][this.stocks[stock_index]["name"]],
                                "name": this.stocks[stock_index]["name"],
                                "action": "lost!",
                            }
                        )
                        this.players[f].logs = this.players[f].logs.splice(0, 50);
                        delete this.players[f]["holdings"][this.stocks[stock_index]["name"]]
                    }

                    this.players[f]["market_val"] = 0
                    if(this.players[f]["holdings"])
                    {
                        for (let stk in this.players[f]["holdings"])
                        {
                            var stk_index = this.stocks.findIndex(function(stock)
                            {
                                return stock.name == stk
                            });
                            this.players[f]["market_val"] += this.players[f]["holdings"][stk]*this.stocks[stk_index]["values"][i]
                        }
                    }
                    this.players[f]["net_worth"] = this.players[f]["market_val"] + this.players[f]["coh"]
                }
            }

            this.turn_num += num;

            // AI Player moves
            for(i=0;i<this.players.length;i++)
            {
                // buy stock
                if([true, true, true, false][this.stockService.getDiscreteRandom(3)])
                {
                    var stk_cnt = this.stockService.getDiscreteRandom(this.stocks.length)
                    for(j=0;j<stk_cnt;j++)
                    {
                        var stock_index = this.stockService.getDiscreteRandom(this.stocks.length)
                        if(this.stocks[stock_index]["values"][this.turn_num-1]*500 < this.players[i]["coh"])
                        {
                            var amt = this.stockService.getRandom(500, this.players[i]["coh"]/this.stocks[stock_index]["values"][this.turn_num-1])
                            var buy_count = ((amt - (amt % 500)) / 500)*500

                            if(this.players[i]["holdings"].hasOwnProperty(this.stocks[stock_index]["name"]))
                            {
                                this.players[i]["holdings"][this.stocks[stock_index]["name"]] += buy_count
                            }
                            else
                            {
                                this.players[i]["holdings"][this.stocks[stock_index]["name"]] = buy_count
                            }

                            this.players[i]["logs"].unshift(
                                {
                                    "type": 0,
                                    "action": "buy",
                                    "count": buy_count,
                                    "worth": buy_count*this.stocks[stock_index]["values"][this.turn_num-1],
                                    "name": this.stocks[stock_index]["name"],
                                    "at": this.stocks[stock_index]["values"][this.turn_num-1],
                                }
                            )
                            this.players[i].logs = this.players[i].logs.splice(0, 50);
                            this.players[i]["coh"] -= buy_count*this.stocks[stock_index]["values"][this.turn_num-1]
                        }
                    }
                }

                // Sell action.
                if([true, false][this.stockService.getDiscreteRandom(2)])
                {
                    var stk_cnt = this.stockService.getDiscreteRandom(Object.keys(this.players[i]["holdings"]).length) + 1
                    for(j = 0; j < stk_cnt; j++)
                    {
                        var stock_index = this.stockService.getDiscreteRandom(Object.keys(this.players[i]["holdings"]).length)
                        var stock_name = Object.keys(this.players[i]["holdings"])[stock_index]

                        var stk_index = this.stocks.findIndex(function(stock)
                        {
                            return stock.name == stock_name
                        });

                        var sell_count = 500*(this.stockService.getRandom(1, this.players[i]["holdings"][stock_name]/500))

                        this.players[i]["holdings"][stock_name] -= sell_count
                        if( this.players[i]["holdings"][stock_name] == 0)
                        {
                            delete this.players[i]["holdings"][stock_name]
                        }

                        this.players[i]["logs"].unshift(
                            {
                                "type": 0,
                                "action": "sell",
                                "count": sell_count,
                                "worth": sell_count*this.stocks[stk_index]["values"][this.turn_num-1],
                                "name": this.stocks[stk_index]["name"],
                                "at": this.stocks[stk_index]["values"][this.turn_num-1],
                            }
                        )
                        this.players[i].logs = this.players[i].logs.splice(0, 50);
                        this.players[i]["coh"] += sell_count*this.stocks[stock_index]["values"][this.turn_num-1]
                    }
                }

                this.players[i]["market_val"] = 0
                if(this.players[i]["holdings"])
                {
                    for (let stk in this.players[i]["holdings"])
                    {
                        var stk_index = this.stocks.findIndex(function(stock)
                        {
                            return stock.name == stk
                        });
    
                        this.players[i]["market_val"] += this.players[i]["holdings"][stk]*this.stocks[stk_index]["values"][this.turn_num-1]
                    }
                }
                this.players[i]["net_worth"] = this.players[i]["market_val"] + this.players[i]["coh"]
            }

            this.players = [...this.players]

            this.data = this.data.slice(Math.max(this.data.length - this.MAX_DP*this.stocks.length, 0))
            if(this.turn_num > this.MAX_DP)
            {
                this.domain = [this.turn_num-this.MAX_DP, this.turn_num]
            }

            this.data = [...this.data];
            this.stockService.setstockLineData({"domain": this.domain, "data": this.data})
        }
    }
}