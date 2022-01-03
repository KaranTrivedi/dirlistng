import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable
(
    {
        providedIn: 'root'
    }
)
export class StockService
{
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

    stockLineData$: Observable<any>
    private stockLineDataSubject = new BehaviorSubject<any>({})

    constructor()
    {
        this.stockLineData$ = this.stockLineDataSubject.asObservable()
    }

    setstockLineData(newData)
    {
        this.stockLineDataSubject.next(newData)
    }

    getRandom(min, max)
    {
        // return (Math.random() * (0 - 2) + 2).toFixed(4)
        return (Math.random() * (max - min) + min).toFixed(0);
    }

    getDiscreteRandom(val)
    {
        // random generates value between 0 and 1
        // In order to make the discrete beehaviour work right,
        // values have to be evenly split into n values.

        return Math.floor(Math.random() * val)
    }

    getStocks()
    {
        return this.stocks_ref
    }
    getStockIndex(name)
    {
        var index = this.stocks_ref.findIndex(function(stock)
        {
            return stock.name == name
        });
        return index
    }
    setBoxStyle(name)
    {
        var index = this.getStockIndex(name)
        var styles = {
            'background-color' : this.stocks_ref[index]["color"],
            'height': '15px',
            'width': '15px',
            'border': '1px solid black',
            'display': 'inline-block',
            'vertical-align': 'sub',
        }
        return styles
    }
}
