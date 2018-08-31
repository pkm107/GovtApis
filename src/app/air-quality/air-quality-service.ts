import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class AirQualityService{
    api_key:string = '579b464db66ec23bdd000001682f22e74cb44b357d2577f199638ddc';
    total_rec:number = 10;
    url:string = 'https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=' + this.api_key + '&format=json&offset=0&limit='+this.total_rec;
    constructor(private http:Http){}

    ActualRes:GrAirResponse[] = [];
    Organizations:string[] = [];
    pageCount:number = 0;

    GetTotal(){
        return this.http.get(this.url).pipe(map(res=>{
            let a : Airresponse = res.json();
            return a.total;
        }));    
    }

    InIt(){        
        this.url = 'https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=' + this.api_key + '&format=json&offset=0&limit='+this.total_rec;        
        return this.http.get(this.url).pipe(map(res=>{
            let a:Airresponse = res.json();
            return a;
        }))
    }
    
    GetAllRecords():GrAirResponse[]{
        return this.ActualRes;
    }

    GetOrganizations(){
        return this.Organizations;
    }
}

export class Airresponse{
    "created_date": string
  "updated_date": string
  "org":string[]
  "sector":string[]
  "status": string
  "message": string
  "total": number
  "count": number
  "limit": string
  "records":AirRecord[]
}

export class AirRecord{
    "id": number
      "country": string
      "state": string
      "city": string
      "station": string
      "last_update": string
      "pollutant_id": string
      "pollutant_min": number
      "pollutant_max": number
      "pollutant_avg": number
      "pollutant_unit": string
}

export class GrAirResponse{
    country:string
    state:string
    city:string
    station:string
    polutants:AirRecord[]
}