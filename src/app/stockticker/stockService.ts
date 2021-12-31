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
    AI_Players = [
        "AI_Nancy Johnson", "AI_Sherrie Ye", "AI_Jesse Craig", "AI_Brandon Velasco", "AI_Jimmy Kerr", "AI_Marie Warnick", "AI_Michael Connors", "AI_Michel Lozier", "AI_Meghan Temple", "AI_Richard Miltner", "AI_Evelyn Maxey", "AI_Dottie Grisham", "AI_Pedro Espinoza", "AI_Richard Harger", "AI_John Pressley", "AI_Shirley Orozco", "AI_John Tompkins", "AI_Glenn Terry", "AI_Angie Reidy", "AI_Marie Maxwell", "AI_James Martin", "AI_Jackie Schultz", "AI_Michael Miller", "AI_Nicole Marcial", "AI_Lisa Sirois", "AI_Edna Laperouse", "AI_Matthew Raney", "AI_Jennifer Grear", "AI_Phil Smith", "AI_Beulah Sanders", "AI_Kelly Buchwald", "AI_Kristi Estler", "AI_Jane Vandusen", "AI_William Tharp", "AI_William West", "AI_Kenneth Black", "AI_Jonathan Asher", "AI_Pamela Lock", "AI_Jeremy Quinn", "AI_Aaron York", "AI_Allen Barkley", "AI_John Francis", "AI_Shawn Kruse", "AI_Kerri Frenzel", "AI_Frank Black", "AI_Sandra Gannon", "AI_Jason Brown", "AI_Eric Sembler", "AI_Janice Knight", "AI_Bryan Newcomb", "AI_Justin Robb", "AI_Mattie Mcclurg", "AI_Michael Stephens", "AI_Terry Maddux", "AI_Joy Machenry", "AI_Terry Sydnor", "AI_Stuart Morrison", "AI_Patricia Bishop", "AI_Patsy Green", "AI_Alvin Burgin", "AI_Mary Yost", "AI_Patricia Primavera", "AI_Michael Logan", "AI_Robert Johnson", "AI_Thelma Argabright", "AI_Bob Mcrae", "AI_James Regalado", "AI_Sheri Peterson", "AI_John Taylor", "AI_James Colin", "AI_Kenneth Leary", "AI_Tamara Ziegler", "AI_Wesley Washington", "AI_Michael Hunt", "AI_Gabriela Taylor", "AI_Sherry Adams", "AI_Mary Breaux", "AI_Sue Harrison", "AI_Antonio Beal", "AI_Ann Barnett", "AI_Margaret Gary", "AI_Jeanette Brown", "AI_Vilma Jones", "AI_Gordon Smith", "AI_Velma Coulter", "AI_Samantha Black", "AI_Barbara Mosher", "AI_Johnny Wallace", "AI_Kenneth Wilson", "AI_Ada Russell", "AI_Steve Sweet", "AI_Kimberly Rogers", "AI_Ruby Lawrence", "AI_Mary Eber", "AI_Lisa Rich", "AI_Catherine Daye", "AI_Ronald Mclemore", "AI_Dudley Cox", "AI_Sharon Grissom", "AI_Beulah Joyner", "AI_Justin Lehnertz", "AI_Ofelia Lohman", "AI_Anthony Frey", "AI_Cyril Talmadge", "AI_Kyle Kim", "AI_Edward Eckstein", "AI_Tammy Scott", "AI_Tammy Larson", "AI_Kenneth Demery", "AI_Sarah Saeler", "AI_Jeremy Suiter", "AI_Chad Simonson", "AI_Helen Luciani", "AI_Andrew Hwang", "AI_Luella Dubreuil", "AI_Randy Lloyd", "AI_Melvin Boldt", "AI_Richard Dunbar", "AI_Matthew Apo", "AI_Brandon Vasquez", "AI_Donna Bourgeois", "AI_Margaret Threatt", "AI_Russell Zahar", "AI_Philip Warner", "AI_Robert Carron", "AI_Marie Sink", "AI_Andrew Gillenwaters", "AI_Barbara Wages", "AI_Alice Ortiz", "AI_Jeffrey Seveney", "AI_Carol Swedlund", "AI_John Illiano", "AI_Richard Wolf", "AI_Sheryl Choate", "AI_Danny Beamer"
    ]

    data$: Observable<any>
    private dataSubject = new BehaviorSubject<any>({})

    constructor()
    {
        this.data$ = this.dataSubject.asObservable()
    }

    setData(newData)
    {
        this.dataSubject.next(newData)
    }
}