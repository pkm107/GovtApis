import { Injectable } from "@angular/core";
import {Http} from '@angular/http'
import 'rxjs';
import {groupBy,map} from 'rxjs/operators';
import { Observable } from "rxjs";
@Injectable({providedIn: 'root',})
export class RailwayService{
constructor(private client:Http){}
url:string = `https://api.data.gov.in/resource/b46200c1-ca9a-4bbe-92f8-b5039cc25a12?api-key=579b464db66ec23bdd000001682f22e74cb44b357d2577f199638ddc&format=json&offset=0&limit=8069`;
resArray : RailwayResponse;
isCompleted : boolean = false;
groupRes:GroupResponse[];
recCount:number=0;
InIt(){
    return this.client.get(this.url).pipe(       
        map(res=>{
        let a:RailwayResponse = res.json();
        return a ;
    } 
    ))}

    LoadSvc(){
      return this.InIt().pipe(
          map(res=>{let a = res.records;return a;})
      )       
    }

    GetFields(){
        if(this.resArray != undefined){
            return this.resArray.field;
        }
        else{return [];}
    }

    GetTrainTimes(){
        if(this.resArray != undefined){
            return this.resArray.records;
        }
        else{return [];}
    }

    GetlastUpdated(){
        if(this.resArray != undefined){
            return this.resArray.updated_date;
        }        
    }

    GetOrganization(){
        if(this.resArray != undefined){
            return this.resArray.org[0];
        }
    }
}

export class GroupResponse{
    train_no:string
    train_name:string
    src_code:string
    src_name:string
    dest_code:string
    dest_name:string
    stops:TrainResponse[]
}

export class RailwayResponse{
    org: string[]
    field: FieldMaping[]
    updated_date : string
    records:TrainResponse[]
}

export class TrainResponse{
    "train_no_": string
      "train_name": string
      "islno": number
      "station_code": string
      "station_name": string
      "arrival_time": string
      "departure_time": string
      "distance": number
      "source_station_code": string
      "source_station_name": string
      "destination_station_code": string
      "destination_station_name": string
}

export class Train{
    constructor(trainno:string,tstops:TrainStops[]){
        this.train_no = trainno;
        this.stops = tstops
    }
    train_no:string
    stops:TrainStops[]
}

export class TrainStops{
    constructor(s:string,ar:string,de:string){
        this.src = s;
        this.arr = ar;
        this.dep = de;
    }
    src:string
    arr:string
    dep:string
}

export class FieldMaping{
    "id": string
    "name": string
    "type": string
}