import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import {map} from 'rxjs/operators'

const headers:Headers = new Headers({'X-Mashape-Key':'P2VsXcRnS7mshntB2SX3AdfYB9ucp1ZJ3mjjsneQMmc0T3z1iI'})
//const header = {'X-Mashape-Key':'P2VsXcRnS7mshntB2SX3AdfYB9ucp1ZJ3mjjsneQMmc0T3z1iI'}

@Injectable({providedIn:'root'})
export class PnrService{
    constructor(private http:Http){}

    GetPnrStatus(pnr:number){
        let uurl = 'https://indianrailways.p.mashape.com/index.php?pnr=' + pnr;
        return this.http.get(uurl,{headers:headers}).pipe(
            map(res => {
                let a:PnrStatus = res.json();
                return a;
            })
        )
    }

}

export class JorneyDetails{
    "trainNumber": string
    "trainName": string
    "boardingDate": string
    "from": string
    "to": string
    "reservedUpto": string
    "boardingPoint": string
    "class": string  
}

export class PassengerDetails{
    "passengerNo": string
    "bookingStatus": string
    "currentStatus": string    
}

export class PnrStatus{
  "pnr": string
  "journeyDetails": JorneyDetails
  "lastUpdated": string
  "bookingStatus": PassengerDetails[]
  "chartingStatus": string
  "error": string
}