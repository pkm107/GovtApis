import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";


@Injectable({providedIn:'root'})
export class ComodityService{
    constructor(private http:Http){}

    InIt(){
        return this.http.get('https://data.gov.in/node/86943/datastore/export/json')
        .pipe(map((r)=>{
            let a:ComodityModel[] = r.json(); 
            return a;
        }))
    }
    getStates(){
        return this.InIt().pipe(
            map(v=>{
                let a:string[]=[];
                v.forEach(s=>{
                    if(a.indexOf(s.state) === -1){
                        a.push(s.state);
                    }
                });
                return a;
            })
        )
    }
    getDistricts(state :string){        
       return this.InIt().pipe(map(s=>{
        let dists:string[]=[];
       let mods = s.filter(f=>{
           return f.state.toLowerCase().includes(state.toLowerCase());
       })
       mods.forEach(d=>{
           if(dists.indexOf(d.district) === -1){
               dists.push(d.district);
           }
       })
        return dists;
    }))  
    }
    getMarkets(state:string,dist:string){
        return this.InIt().pipe(map(s=>{
            let markets:string[]=[];
           let mods = s.filter(f=>{
               return f.state.toLowerCase().includes(state.toLowerCase())
               && f.district.toLowerCase().includes(dist.toLowerCase());
           })
           mods.forEach(d=>{
               if(markets.indexOf(d.market) === -1){
                markets.push(d.market);
               }
           })
            return markets;
        }))
    }
    getcomodities(state:string,dist:string,market:string){
        if(state !== undefined || state !== ''){
            if(dist !== undefined || dist !== ''){
                if(market  !== undefined || market !== ''){
                    return this.InIt().pipe(map(s=>{
                        let comodities:string[]=[];
                       let mods = s.filter(f=>{
                           return f.state.toLowerCase().includes(state.toLowerCase())
                           && f.district.toLowerCase().includes(dist.toLowerCase())
                           && f.market.toLowerCase().includes(market.toLowerCase());
                       })                       
                       mods.forEach(d=>{
                           if(comodities.indexOf(d.commodity) === -1){
                            comodities.push(d.commodity);
                           }
                       })
                        return comodities.sort();
                    }))
                }
            }
        }
        else{
            return this.InIt().pipe(map(s=>{
                let comodities:string[]=[];               
               s.forEach(d=>{
                   if(comodities.indexOf(d.commodity) === -1){
                    comodities.push(d.commodity);
                   }
               })
                return comodities;
            }))
        }
    }
}

export class ComodityModel{
    "state":string
    "district":string
    "market":string
    "commodity":string
    "variety":string
    "arrival_date":string
    "min_price":string
    "max_price":string
    "modal_price":string
}