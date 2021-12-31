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
}
